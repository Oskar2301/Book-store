import React, { FC } from "react";
import { Book } from "../../../../components/Book";

interface FavoriteProps {
  favorite: any;
  classesFav: any;
  classesFavEmpty: any;
}

export const Favorite: FC<FavoriteProps> = ({
  favorite,
  classesFav,
  classesFavEmpty,
}) => {
  return (
    <>
      {favorite.length ? (
        <div className={classesFav}>
          {favorite.map((item: any, index: number) => {
            return <Book key={index} {...item} setFavorite={true} />;
          })}
        </div>
      ) : (
        <div className={classesFavEmpty}>
          <img src="/img/favorite-state.png" alt="favorite" />
          <p>Нажаль ви не добавили ні одної книги в "улюбленні"</p>
        </div>
      )}
    </>
  );
};
