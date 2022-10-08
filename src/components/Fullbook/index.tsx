import React, { FC, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Fullbook.module.scss";
import { WindowAlert } from "../WindowAlert";
import { useBook } from "../../hooks/useBook";

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
  } = useBook(id!);
  const [alertWindow, setAlertWindow] = useState(false);

  const handleClick = () => {
    setAlertWindow(true);
    setTimeout(() => {
      setAlertWindow(false);
    }, 2000);
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
          <div className={styles.order}>
            <div>
              <h3>Вартість:</h3>
              <p>{price}</p>
            </div>
            <button onClick={handleClick}>Замовити</button>
          </div>
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
