import uniq from "@/utils/uniq";
import Courses from "./course";
import { CountedItem } from "./lib/counted_item";
import { ItemDoesNotExist, checkError } from "./lib/errors";
import { Item, Model } from "./lib/model";
import UpdateValue from "./lib/update_value";
import { range } from "d3";
import { CountedModel } from "./lib/counted_model";
import { Sessions } from "./session";
import { getCurrentSession } from "@/logic/website_data";
/**
 * @typedef {import("./lib/transaction").default} Transaction;
 */
export class Grade extends CountedItem {
  scores = {};
  classId = "";
  studentId = "";
  session = getCurrentSession();
  avg() {
    return this.total() / Object.keys(this.scores).length;
  }
  total() {
    return Object.keys(this.scores).reduce((a, e) => a + this.scores[e], 0);
  }
  score(subject) {
    return this.scores[subject];
  }
  /**
   *
   * @param {Transaction} txn
   * @param {*} newState
   */
  async onAddItem(txn, newState) {
    await super.onAddItem(txn, newState);
    await GradeSummary.of(this).updateTotal(txn, newState, null);
  }
  async onDeleteItem(txn, prevState) {
    await super.onDeleteItem(txn, prevState);
    await GradeSummary.of(this).updateTotal(txn, null, prevState);
  }
  async onUpdateItem(txn, newState, prevState) {
    await super.onUpdateItem(txn, newState, prevState);
    await GradeSummary.of(this).updateTotal(txn, newState, prevState);
  }
}
Grade.markTriggersUpdateTxn(["scores"], false);

const bucket = (score) => {
  score === undefined ? undefined : score;
};
class GradeSummary extends Item {
  scores = { numScores: 0 };
  avg(subject) {
    return this.scores[subject]
      ? this.scores[subject].total / this.scores[subject].count
      : 0;
  }
  total(subject) {
    return this.scores[subject] ? this.scores[subject].total : 0;
  }
  getScores(subject) {
    return this.scores[subject]
      ? Object.keys(this.scores[subject])
          .map((e) => (isNaN(e) ? [] : range(Number(e)).map((e) => Number(e))))
          .flat()
      : 0;
  }
  static diff(oldScores, newScores) {
    if (!oldScores) oldScores = {};
    if (!newScores) newScores = {};
    const keys = Object.keys(oldScores)
      .concat(Object.keys(newScores))
      .sort()
      .filter(uniq);
    return keys.reduce(
      (acc, a) => (
        (acc[a] = {
          total: UpdateValue.add(newScores[a] | 0) - (oldScores[a] | 0),
          count: UpdateValue.add(
            !!(newScores[a] === undefined) - !!(oldScores[a] === undefined)
          ),
          ...(bucket(oldScores[a]) !== bucket(newScores[a])
            ? {
                ...(bucket(oldScores[a]) === undefined
                  ? { [bucket(oldScores[a])]: UpdateValue.add(-1) }
                  : {}),
                ...(bucket(newScores[a]) === undefined
                  ? { [bucket(newScores[a])]: UpdateValue.add(1) }
                  : {}),
              }
            : {}),
        }),
        acc
      ),
      {}
    );
  }

  async updateTotal(txn, newState, prevState) {
    await this.set(
      {
        scores: {
          ...GradeSummary.diff(prevState?.scores, newState?.scores),
          numScores: UpdateValue.add(!!newState - !!prevState),
        },
      },
      txn
    );
  }
  /**
   * @param {Grade} grade
   * @returns {GradeSummary}
   */
  static of(grade) {
    return GradeSummaries.item(grade.classId + ":sum", true);
  }
  load() {
    try {
      super.load();
    } catch (e) {
      checkError(e, ItemDoesNotExist);
    }
  }
}
const GradeSummaries = new Model("grade_summaries", GradeSummary);
const Grades = new CountedModel("grades", Grade, {
  scores: {
    type: "map",
    mapType: {
      key: {
        label: "Subject",
        type: "ref",
        refModel: Courses,
        pickRefQuery: true,
      },
      value: {
        label: "Score",
        type: "number",
      },
    },
  },
});
Sessions.hasOneOrMore(Grades, "session");
export default Grades;
