import React, { FC, useState } from "react";
import styles from "./Auth.module.scss";
import { useAuth } from "../../hooks/useAuth";

interface FormProps {
  title: string;
  handleClick: (email: string, password: string) => void;
}

export const Form: FC<FormProps> = ({ title, handleClick }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailValidation, setEmailValidation] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState(false);
  const { errorLogin, errorAuth } = useAuth();

  const isValidateEmail = (email: string) => {
    return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email);
  };

  const isValidatePassword = (password: string) => {
    return password.trim().length > 6;
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isValidateEmail(e.target.value)) {
      setEmailValidation(false);
    } else {
      setEmailValidation(true);
    }
    setEmail(e.target.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isValidatePassword(e.target.value)) {
      setPasswordValidation(false);
    } else {
      setPasswordValidation(true);
    }
    setPassword(e.target.value);
  };

  return (
    <>
      <input
        className={`${styles.input} ${!emailValidation ? styles.error : ""}`}
        type="email"
        placeholder="Введіть пошту"
        onChange={handleChangeEmail}
        value={email}
        autoComplete="new-password"
      />
      <input
        className={`${styles.input} ${!passwordValidation ? styles.error : ""}`}
        type="password"
        value={password}
        onChange={handleChangePassword}
        placeholder="Введіть пароль"
        autoComplete="new-password"
      />
      {errorLogin && (
        <div className={styles.errorMessage}>Неправильний логін або пароль</div>
      )}
      {errorAuth && (
        <div className={styles.errorMessage}>
          Ця електронна адреса вже використовується
        </div>
      )}
      <button
        disabled={!(emailValidation && passwordValidation)}
        type="button"
        onClick={() => handleClick(email, password)}
      >
        {title}
      </button>
    </>
  );
};
