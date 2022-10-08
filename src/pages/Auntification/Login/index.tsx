import React from "react";
import { Login } from "../../../components/Auth/Login";
import styles from "../Auth.module.scss";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

export const LoginPage = () => {
  const { isAuth } = useAuth();
  const location = useLocation();

  return isAuth ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    <div className={styles.authPage}>
      <div className={styles.authPage__form}>
        <h1>Ввійдіть в обліковий запис</h1>
        <Login />
        <div className={styles.authPage__link}>
          <p>У вас немає облікового запису?</p>
          <Link to="/register">Зареєструватись</Link>
        </div>
      </div>
    </div>
  );
};
