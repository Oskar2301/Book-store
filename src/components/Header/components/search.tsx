import React, { useCallback, useState } from "react";
import styles from "../Header.module.scss";
import { useDispatch } from "react-redux";
import debounce from "lodash.debounce";
import { setSearch } from "../../../redux/slices/headerSlice";

export const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  const onChangeSearch = useCallback(
    debounce((str) => {
      dispatch(setSearch(str));
    }, 500),
    []
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    onChangeSearch(event.target.value);
  };

  return (
    <div className={styles.search}>
      <img src="/img/search.png" alt="logo" />
      <input
        type="text"
        placeholder="Введіть назву книги..."
        value={value}
        onChange={onChangeInput}
      />
    </div>
  );
};
