import React, { FC } from "react";
import { Book } from "../../../../components/Book";

interface FavoriteProps {
  orders: any;
  classesOrder: any;
  classesOrderEmpty: any;
}

export const Order: FC<FavoriteProps> = ({
  orders,
  classesOrder,
  classesOrderEmpty,
}) => {
  return (
    <>
      {orders.length ? (
        <div className={classesOrder}>
          {orders.map((item: any, index: number) => {
            return (
              <Book
                key={index}
                {...item}
                setFavorite={false}
                setLoading={true}
              />
            );
          })}
        </div>
      ) : (
        <div className={classesOrderEmpty}>
          <img src="/img/shopping-cart.png" alt="favorite" />
          <p>Нажаль ви не зробили ні одного замовлення</p>
        </div>
      )}
    </>
  );
};
