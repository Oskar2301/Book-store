import React, { FC, useEffect, useState } from "react";
import styles from "./Book.module.scss";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { favUserBase } from "../../pages/Profile/FireBase/DataBase";

export const Book: FC = (props: any) => {
  const { isAuth, userId, userEmail } = useAuth();
  const [isFavorite, setIsFavorite] = useState(props.setFavorite);

  const imgUrl =
    props.volumeInfo.imageLinks && props.volumeInfo.imageLinks.smallThumbnail;
  const descriptionProps = props.volumeInfo.description
    ? props.volumeInfo.description
    : "Немає опису";
  const description = descriptionProps.slice(0, 40);

  const handleFav = () => {
    if (isAuth) {
      favUserBase(userId!, userEmail!, props);
      setIsFavorite(true);
    } else {
      alert("error");
    }
  };

  useEffect(() => {
    if (
      JSON.parse(localStorage.getItem("User")!) &&
      JSON.parse(localStorage.getItem("User")!).fav &&
      JSON.parse(localStorage.getItem("User")!).fav.some(
        (book: any) => book.id === props.id
      )
    ) {
      setIsFavorite(true);
    }
  }, []);

  return (
    <div className={styles.book}>
      <img src={imgUrl ? imgUrl : "/img/notFound.jpg"} alt="book" />
      <h3>{`${props.volumeInfo.title.slice(0, 35)}${
        props.volumeInfo.title.length > 35 ? "..." : ""
      }`}</h3>
      <p>{`${description}${descriptionProps.length > 40 ? "..." : ""}`}</p>
      <div className={styles.interaction}>
        <Link to={`/${props.id}`}>
          <button className={styles.read}>Read More</button>
        </Link>
        {props.setLoading ? (
          <button className={styles.fav}>
            <img src="/img/order-complete.png" alt="fav" />
          </button>
        ) : (
          <button className={styles.fav} onClick={handleFav}>
            <img
              src={isFavorite ? "/img/favOn.png" : "/img/fav.png"}
              alt="fav"
            />
          </button>
        )}
      </div>
    </div>
  );
};
