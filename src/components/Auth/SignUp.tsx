import React, { FC } from "react";
import { Form } from "./Form";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import styles from "./Auth.module.scss";
import { errorAuth, setUser } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

export const SignUp: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (email: string, password: string) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        dispatch(
          setUser({
            user,
          })
        );
        navigate("/profile");
      })
      .catch(() => dispatch(errorAuth()));
  };

  return (
    <div className={styles.form}>
      <Form title="Створити" handleClick={handleRegister} />
    </div>
  );
};
