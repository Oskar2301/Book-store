import React, { useEffect, useState } from "react";
import styles from "./Home.module.scss";
import { Book } from "../../components/Book";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import axios from "axios";
import { setItems } from "../../redux/slices/homeSlice";
import { Skeleton } from "../../components/Skeleton";
import { NotFound } from "../../components/notFound";
import { Navigation } from "../../components/Navigation";
import { useAuth } from "../../hooks/useAuth";
import { createUserBase } from "../Profile/FireBase/DataBase";

const tags = [
  "небезпечні пригоди",
  "надздібності",
  "інші світи",
  "наукова фантастика",
  "пригоди",
  "магія",
  "гумор",
  "фентезі",
  "космос",
  "хорор",
  "подорожі у часі",
  "доля",
  "драма",
  "дружба",
  "привиди",
  "помста",
  "казкові пригоди",
  "героизм",
  "жахи",
  "школа",
  "квест",
  "любов",
  "філософія",
];

export const Home = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const search = useSelector((state: RootState) => state.headerReducer.search);
  const items = useSelector((state: RootState) => state.homeReducer.items);
  const { isAuth, userId, userEmail } = useAuth();

  const arrayRandElement = (arr: any) => {
    const rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
  };

  useEffect(() => {
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${
          search ? search : "Harry Potter"
        }&key=AIzaSyAm_7tIFZxbn-d_mvLS_Ov1UzPwYswDmw0&maxResults=28`
      )
      .then((res) => {
        const books = res.data.items.map((item: any) => {
          const random = Math.floor(Math.random() * (6 - 3 + 1) + 3);
          const tag = [...new Array(random)].map(() => {
            return arrayRandElement(tags);
          });
          const uniqueTag = new Set([...tag]);
          return { ...item, tags: Array.from(uniqueTag) };
        });
        dispatch(setItems(books));
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [search]);

  useEffect(() => {
    if (isAuth && userId && userEmail) {
      createUserBase(userId, userEmail);
    }
  }, []);

  return (
    <div className={styles.home}>
      {items === undefined ? "" : <Navigation />}

      <div className={items === undefined ? "" : styles.items}>
        {isLoading ? (
          [...new Array(8)].map((items, index) => <Skeleton key={index} />)
        ) : items === undefined ? (
          <NotFound />
        ) : (
          items.map((item: any, index: number) => {
            if (
              item.volumeInfo.imageLinks &&
              item.volumeInfo.imageLinks.smallThumbnail &&
              item.volumeInfo.authors
            ) {
              return <Book key={index} {...item} />;
            } else {
              return null;
            }
          })
        )}
      </div>
    </div>
  );
};
