export {
  // Model
  collection,
  deleteDoc,
  deleteField,
  doc,
  setDoc,
  updateDoc,
  // Update Values
  increment,
  arrayUnion,
  arrayRemove,
  FieldValue,
  // Transactions
  refEqual,
  runTransaction,
  writeBatch,
  // Queries
  getDoc,
  where,
  query,
  getDocs,
  onSnapshot,
  orderBy,
  startAfter,
  limit,
  endBefore,
  limitToLast,
  getCountFromServer,
  documentId,
  queryEqual,
} from "firebase/firestore";

export const SUPPORTS_REF_SORTING = false;
