export default function plural(m) {
  if (!m) return m;
  if (m.endsWith("s")) return m + "es";
  else return m + "s";
}
