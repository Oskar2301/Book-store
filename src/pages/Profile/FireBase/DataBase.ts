import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { getBase } from "./GetBase";

export async function createUserBase(userId: string, userEmail: string) {
  try {
    const res = await getBase(userId!);
    let favorite: any[] = [];
    if (res) {
      favorite = res.fav;
    } else {
      favorite = [];
    }
    localStorage.setItem(
      "User",
      JSON.stringify({ userId, userEmail, fav: favorite })
    );
    await setDoc(doc(db, "users", userId), {
      email: userEmail,
      fav: favorite,
    });
  } catch (e) {
    console.error(e);
  }
}

export async function favUserBase(
  userId: string,
  userEmail: string,
  book: any
) {
  try {
    const res = await getBase(userId!);
    if (res!.fav.some((e: any) => e.id === book.id)) {
      alert("already add");
      return;
    }
    res!.fav.push(book);

    localStorage.setItem(
      "User",
      JSON.stringify({ userId, userEmail, fav: res!.fav })
    );

    await setDoc(doc(db, "users", userId), {
      email: userEmail,
      fav: res!.fav,
    });
  } catch (e) {
    console.error(e);
  }
}
