import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { getBase } from "./GetBase";

export async function createUserBase(userId: string, userEmail: string) {
  try {
    const res = await getBase(userId!);

    let favorite: any[] = [];
    let orders: any[] = [];

    if (res) {
      favorite = res.fav;
      orders = res.orders;
    }

    if (!res) {
      localStorage.setItem(
        "User",
        JSON.stringify({ userId, userEmail, fav: favorite, orders: orders })
      );
    }

    await setDoc(doc(db, "users", userId), {
      email: userEmail,
      fav: favorite,
      orders: orders,
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
      let bookFind = res!.fav.indexOf(
        res!.fav.find((e: any) => e.id === book.id)
      );
      if (bookFind !== -1) {
        res!.fav.splice(bookFind, 1);
        console.log("book was delete");
      }
    } else {
      res!.fav.push(book);
    }

    localStorage.setItem(
      "User",
      JSON.stringify({ userId, userEmail, fav: res!.fav, orders: res!.orders })
    );

    await setDoc(doc(db, "users", userId), {
      email: userEmail,
      fav: res!.fav,
      orders: res!.orders,
    });
  } catch (e) {
    console.error(e);
  }
}

export async function orderUserBase(
  userId: string,
  userEmail: string,
  book: any
) {
  try {
    const res = await getBase(userId!);

    res!.orders.push(book);

    localStorage.setItem(
      "User",
      JSON.stringify({ userId, userEmail, fav: res!.fav, orders: res!.orders })
    );

    await setDoc(doc(db, "users", userId), {
      email: userEmail,
      fav: res!.fav,
      orders: res!.orders,
    });
  } catch (e) {
    console.error(e);
  }
}
