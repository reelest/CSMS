import { DB, firestore } from "@/shared/logic/firebase_init";
console.log({ DB, firestore: firestore });
const { increment, arrayUnion, arrayRemove, FieldValue } = DB;
export default class UpdateValue {
  // resolve() {
  //   throw new UnimplementedError("resolve is unimplemented");
  // }
  // toFirestore() {
  //   throw new UnimplementedError("toFirestore is unimplemented");
  // }
  static add(value) {
    return increment(value);
  }
  static arrayUnion(...value) {
    return arrayUnion(...value);
  }
  static arrayRemove(...value) {
    return arrayRemove(...value);
  }
}

export function isUpdateValue(value) {
  return value instanceof FieldValue;
}
// class Increment extends UpdateValue {
//   constructor(value) {
//     super();
//     this.value = value;
//   }
//   resolve(data, prop) {
//     return (data[prop] | 0) + this.value;
//   }
//   toFirestore() {
//     return increment(this.value);
//   }
// }

// class ArrayUnion extends UpdateValue {
//   constructor(value) {
//     super();
//     this.value = value;
//   }
//   resolve(data, prop) {
//     return (data[prop] | []).concat(this.value.filter(notIn(data[prop] | [])));
//   }
//   toFirestore() {
//     return arrayUnion(...this.value);
//   }
// }

// class ArrayRemove extends UpdateValue {
//   constructor(value) {
//     super();
//     this.value = value;
//   }
//   resolve(data, prop) {
//     return (data[prop] | []).filter(notIn(this.value));
//   }
//   toFirestore() {
//     return arrayRemove(...this.value);
//   }
// }
