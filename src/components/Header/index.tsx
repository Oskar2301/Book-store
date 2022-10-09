import React, { FC } from "react";
import styles from "./Header.module.scss";

import { Link, useLocation } from "react-router-dom";
import { Search } from "./components/search";
import { useAuth } from "../../hooks/useAuth";

export const Header: FC = () => {
  const location = useLocation();
  const { userEmail } = useAuth();

  return (
    <div className={styles.header}>
      <Link to="/">
        <img src="/img/logo.png" alt="logo" />
      </Link>
      {location.pathname === "/" ? <Search /> : ""}
      <div className={styles.account}>
        {!userEmail ? (
          <>
            <Link to="/login">
              <button className={styles.login}>Login</button>
            </Link>
            <Link to="/register">
              <button className={styles.sign}>Sign Up</button>
            </Link>
          </>
        ) : (
          <Link to="/profile">
            <img src="/img/user.png" alt="profile" />
            <p>{userEmail}</p>
          </Link>
        )}
      </div>
    </div>
  );
};
