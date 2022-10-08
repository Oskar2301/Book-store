import React from "react";
import { SignUp } from "../../../components/Auth/SignUp";
import styles from "../Auth.module.scss";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

export const RegisterPage = () => {
  const { isAuth } = useAuth();
  const location = useLocation();

  return isAuth ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    <div className={styles.authPage}>
      <div className={styles.authPage__form}>
        <h1>Створіть обліковий запис</h1>
        <SignUp />
        <div className={styles.authPage__link}>
          <p>Маєте є обліковий запис?</p>
          <Link to="/login">Ввійти</Link>
        </div>
      </div>
    </div>
  );
};
