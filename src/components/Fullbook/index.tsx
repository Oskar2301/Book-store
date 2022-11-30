import React, { FC, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Fullbook.module.scss";
import { WindowAlert } from "../WindowAlert";
import { useBook } from "../../hooks/useBook";
import { orderUserBase } from "../../pages/Profile/FireBase/DataBase";
import { useAuth } from "../../hooks/useAuth";

export const FullBook: FC = () => {
  const { id } = useParams();
  const {
    title,
    imgUrl,
    descriptionProps,
    author,
    countPage,
    category,
    date,
    demo,
    language,
    price,
    book,
  } = useBook(id!);
  const [alertWindow, setAlertWindow] = useState(false);
  const { isAuth, userId, userEmail } = useAuth();

  const handleClick = () => {
    if (userId && userEmail) orderUserBase(userId, userEmail, book);
    setAlertWindow(true);
    setTimeout(() => {
      setAlertWindow(false);
    }, 2000);
  };

  const handleCheckOrder = () => {
    if (
      JSON.parse(localStorage.getItem("User")!) &&
      JSON.parse(localStorage.getItem("User")!).orders
    ) {
      console.log(
        JSON.parse(localStorage.getItem("User")!).orders.some(
          (book: any) => book.id === id
        )
      );
      return JSON.parse(localStorage.getItem("User")!).orders.some(
        (book: any) => book.id === id
      );
    }
    return false;
  };

  return (
    <div className={styles.book}>
      <div className={styles.picture}>
        <img src={imgUrl ? imgUrl : "/img/notFound.jpg"} alt="" />
      </div>
      {alertWindow && (
        <WindowAlert title="Замовлення зроблено" color="#01c001" />
      )}
      <div className={styles.info}>
        <div className={styles.main}>
          <h2>{title}</h2>
          <h3>{author}</h3>
          <p>{descriptionProps}</p>
        </div>
        <hr />
        <div className={styles.fullInfo}>
          <div>
            <p>
              Кількість сторінок:<span>{countPage}</span>
            </p>
            <p>
              Категорія:<span>{category}</span>
            </p>
            <p>
              Дата випуску:<span>{date}</span>
            </p>
          </div>
          <div>
            <p>
              Демо версія:<span>{demo}</span>
            </p>
            <p>
              Мова:<span>{language}</span>
            </p>
            <p>
              Ціна:<span>{price}</span>
            </p>
          </div>
        </div>
        {price !== "Невідомо" ? (
          isAuth ? (
            handleCheckOrder() ? (
              <div className={styles.noAvailable}>
                <h3>Ви вже замовили книгу</h3>
                <button>Недосяжна</button>
              </div>
            ) : (
              <div className={styles.order}>
                <div>
                  <h3>Вартість:</h3>
                  <p>{price}</p>
                </div>
                <button onClick={handleClick}>Замовити</button>
              </div>
            )
          ) : (
            <div className={styles.noAvailable}>
              <h3>Потрібно ввійти в аккаунт</h3>
              <button>Недосяжна</button>
            </div>
          )
        ) : (
          <div className={styles.noAvailable}>
            <h3>Немає в наявності</h3>
            <button>Недосяжна</button>
          </div>
        )}
      </div>
    </div>
  );
};
