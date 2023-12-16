import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase_init";
import createSubscription from "@/shared/utils/createSubscription";
import { noop } from "@/shared/utils/none";
export const [useUser, onUser, , getUser] = createSubscription(
  /** @type {import("@/shared/utils/createSubscription").SubscribeInit<import("firebase/auth").User>} */ (
    (setUser) => onAuthStateChanged(auth, setUser)
  )
);
if (auth) onUser(noop); //Start the subscription always on client side
export const signIn = async ({ email, password }) => {
  await signInWithEmailAndPassword(auth, email, password);
};
export const doLogOut = async () => {
  await signOut(auth);
};

export const signUp = async ({ email, password }) => {
  await createUserWithEmailAndPassword(auth, email, password);
};

export const resetPassword = async ({ email }) => {
  sendPasswordResetEmail(auth, email);
};
