import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import React from "react";

export function useBook(id: string) {
  const items = useSelector((state: RootState) => state.homeReducer.items);
  const book = items.find((item: any) => item.id === id);

  const title = book.volumeInfo.title;
  const imgUrl =
    book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.smallThumbnail;
  const descriptionProps = book.volumeInfo.description
    ? book.volumeInfo.description
    : "Немає опису";
  const author = book.volumeInfo.authors
    ? book.volumeInfo.authors[0]
    : "Автор не знайдений";
  const countPage = book.volumeInfo.pageCount
    ? book.volumeInfo.pageCount
    : "Невідомо";
  const category = book.volumeInfo.categories
    ? book.volumeInfo.categories
    : "Невідомо";
  const date = book.volumeInfo.publishedDate
    ? book.volumeInfo.publishedDate
    : "Невідомо";
  const demo = book.volumeInfo.previewLink ? (
    <a href={book.volumeInfo.previewLink} target="_blank" rel="noreferrer">
      Посилання
    </a>
  ) : (
    "Невідомо"
  );
  const language = book.volumeInfo.language
    ? book.volumeInfo.language
    : "Невідомо";
  const price =
    book.saleInfo.listPrice && book.saleInfo.listPrice.amount
      ? `${book.saleInfo.listPrice.amount} ${book.saleInfo.listPrice.currencyCode}`
      : "Невідомо";

  return {
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
  };
}
