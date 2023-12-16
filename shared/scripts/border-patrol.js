const fs = require("fs").promises;
const path = require("path").posix;

class Edit {
  start = 0;
  end = 0;
  insert = "";
  remove = "";
  constructor(start, end, insert, remove) {
    this.start = start;
    this.end = end;
    this.insert = insert;
    this.remove = remove;
  }
  apply(content) {
    if (this.remove !== content.slice(this.start, this.end)) {
      console.log(
        "Failed to apply edit because",
        content.slice(this.start, this.end),
        "(",
        this.start,
        "->",
        this.end,
        ")",
        "!==",
        this.remove
      );
      return content;
    }
    return content.slice(0, this.start) + this.insert + content.slice(this.end);
  }
  static insert(index, content) {
    return new Edit(index, index, content);
  }

  static replace(index, oldText, newText) {
    return new Edit(index, index + oldText.length, newText, oldText);
  }

  static remove(index, content) {
    return new Edit(index, index + content.length, "", content);
  }

  static applyAll(edits, content) {
    return edits
      .slice()
      .sort((a, b) => b.start - a.start)
      .reduce((content, e) => e.apply(content), content);
  }
}

class SourceFile {
  path;
  _imports;
  _content;
  constructor(path) {
    this.path = path;
  }
  async imports() {
    if (this._imports !== undefined) return this._imports;
    const content = await this.content();
    const files = [];
    content.replace(
      /((?:^|[\n;])\s*import\b\s*)((?!\s*['"])[\s\S]{1,200}?)(\bfrom\b\s*)(['"])(.*?)\4/g,
      (match, _, names, __, ___, path, index) => {
        const imports = [];
        files.push({
          path,
          start: index + _.length + names.length + __.length + 1,
          imports,
        });
        names = names.split(/(?=\W)/);
        let inDefaultExport = true;
        let lastImport;
        let inAlias;
        index += _.length;
        for (let _name of names) {
          index += _name.length;
          let name = _name.replace(/^\s+|\s+$/g, "");
          if (!name) continue;
          else if (name == "as") inAlias = true;
          else if (name === "{") {
            inDefaultExport = false;
            lastImport = null;
          } else if (name === "}") inDefaultExport = true;
          else if (name === ",") {
            lastImport = null;
          } else {
            if (inAlias) {
              console.assert(
                !!lastImport,
                "Expected import before 'as' in " +
                  match +
                  "->" +
                  (index - _name.length) +
                  "/" +
                  name +
                  ":" +
                  this.path
              );
              if (!lastImport) console.log(imports);
              else lastImport.as = name;
              inAlias = false;
            } else {
              console.assert(
                !lastImport,
                "Unexpected word after import ->" +
                  match +
                  "->" +
                  (index - _name.length) +
                  "/word: " +
                  name +
                  ":" +
                  this.path
              );
              lastImport = {
                name,
                value: name !== "*" && inDefaultExport ? "default" : name,
                as: name,
                start: index - _name.length + _name.indexOf(name),
              };
              imports.push(lastImport);
            }
          }
        }
      }
    );
    this._imports = files;
    return this._imports;
  }
  async content() {
    if (this._content !== undefined) return this._content;
    this._content = await fs.readFile(this.path, "utf8");
    return this._content;
  }
  async apply(edits) {
    this._content = Edit.applyAll(edits, await this.content());
  }
  async save() {
    await fs.writeFile(this.path, this._content);
  }
}

function is_relative_import(directory, _import) {
  // Determine whether an import should be
  // relative or not
  if (directory === "") {
    return false;
  }
  if (_import.startsWith(directory)) {
    return true;
  }
  if (/^components\/\w+\//.test(_import)) {
    return true;
  }
  return false;
}

async function walk(_path, cb) {
  if (/node_modules|\.git|^dist$/.test(_path)) return;
  await Promise.all(
    (
      await fs.readdir(_path)
    ).map(async (f) => {
      let e = path.join(_path, f);
      if ((await fs.lstat(e)).isDirectory()) {
        await walk(e, cb);
      } else cb(e);
    })
  );
}

async function main({
  normalize = false,
  fix = true,
  applyChanges = false,
} = {}) {
  const files = [];
  await walk(".", (file) => {
    files.push(file);
  });
  files.forEach(async (file) => {
    const source = new SourceFile(file);
    const imports = await source.imports();
    const dir = path.dirname(file);
    const edits = [];
    imports.forEach((el) => {
      let importPath = el.path;
      if (importPath.startsWith("@/")) {
        importPath = importPath.slice(2);
      } else if (importPath.startsWith("./") || importPath.startsWith("../")) {
        importPath = path.join(dir, importPath);
      } else {
        return;
      }
      let newPath = "";
      if (normalize) {
        newPath = importPath;
      }
      if (fix) {
        const possiblePaths =
          path.extname(importPath) === ""
            ? [importPath + ".js", importPath + "/index.js"]
            : [importPath];
        if (!possiblePaths.some((e) => files.includes(e))) {
          console.log(
            "Missing import " + el.path + " in " + file,
            ":",
            possiblePaths.join(",")
          );
          const dirName = path.dirname(importPath);
          const baseNames = possiblePaths.map((e) => e.slice(dirName.length));
          const possibleMatches = files.filter((e) =>
            baseNames.some((p) => e.endsWith(p))
          );
          if (possibleMatches.length)
            console.log(
              "Possible matches: " + (possibleMatches.join(", ") || "None")
            );

          if (possibleMatches.length === 1) {
            newPath = possibleMatches[0];
          }
        }
      }
      if (newPath) {
        newPath = is_relative_import(dir, newPath)
          ? path
              .relative(dir, newPath.replace(/(?:\/index\.js|\.js)$/, ""))
              .replace(/^(?!\.[./])/g, "./")
          : "@/" + newPath.replace(/\/index\.js$|((?:^|\/)\w+)\.js$/, "$1");
        if (newPath !== el.path)
          edits.push(Edit.replace(el.start, el.path, newPath));
      }
    });
    if (edits.length) {
      console.log(edits);
      if (applyChanges) {
        await source.apply(edits);
        await source.save();
      }
    }
  });
}
const applyChanges =
  process.argv.includes("-a") || process.argv.includes("--apply");
if (process.argv.includes("-h") || process.argv.includes("--help")) {
  console.log(`border-patrol [-h|--help|-a|--apply] command
A script to fix up your imports and exports. Only supports ESModules. Does not fix dynamic imports.
Options:
    -h| --help\t- Show this help
    -a| --apply\t-Apply changes
Commands:
    fix\t- Fix the filepaths of missing imports (default)
    norm\t- Normalize imports according to rules
`);
} else if (process.argv.includes("fix")) {
  main({ missing: true, applyChanges });
} else if (process.argv.includes("norm")) {
  main({ normalize: true, fix: false, applyChanges });
} else main({ applyChanges });
