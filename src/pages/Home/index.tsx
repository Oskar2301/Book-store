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

export const Home = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const search = useSelector((state: RootState) => state.headerReducer.search);
  const items = useSelector((state: RootState) => state.homeReducer.items);
  useEffect(() => {
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${
          search ? search : "JavaScript"
        }&key=AIzaSyAm_7tIFZxbn-d_mvLS_Ov1UzPwYswDmw0&maxResults=28`
      )
      .then((res) => {
        dispatch(setItems(res.data.items));
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [search]);

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
