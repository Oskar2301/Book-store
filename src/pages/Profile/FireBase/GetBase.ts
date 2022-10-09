import { collection, getDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";

export async function getBase(id: string) {
  const docRef = doc(db, "users", id);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}
