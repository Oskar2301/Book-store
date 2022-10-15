import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createUserBase } from "./FireBase/DataBase";
import { getBase } from "./FireBase/GetBase";
import styles from "./Profile.module.scss";
import { removeUser } from "../../redux/slices/userSlice";
import { Book } from "../../components/Book";

export const Profile = () => {
  const { isAuth, userId, userEmail } = useAuth();
  const dispatch = useDispatch();
  const location = useLocation();
  const [category, setCategory] = useState(true);
  const [favorite, setFavorite] = useState([]);
  const favoriteChange = JSON.parse(localStorage.getItem("User")!);

  const getFavoriteBooks = async () => {
    const res = await getBase(userId!);
    setFavorite(res?.fav);
  };

  useEffect(() => {
    if (isAuth) {
      createUserBase(userId!, userEmail!);
    }
    getFavoriteBooks();
  }, [favoriteChange.fav]);

  return isAuth ? (
    <div className={styles.profile}>
      <div className={styles.info}>
        <h1>Email: {userEmail}</h1>
        <Link to="/" onClick={() => dispatch(removeUser())}>
          Log Out
        </Link>
        <div className={styles.category}>
          <h3
            onClick={() => setCategory(true)}
            className={category ? styles.active : ""}
          >
            Orders
          </h3>
          <h3
            onClick={() => setCategory(false)}
            className={!category ? styles.active : ""}
          >
            Favorite
          </h3>
        </div>
        <hr />
      </div>
      {category ? (
        <div>hi</div>
      ) : (
        <div className={styles.items}>
          {favorite.map((item: any, index: number) => {
            return <Book key={index} {...item} setFavorite={true} />;
          })}
        </div>
      )}
    </div>
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};
