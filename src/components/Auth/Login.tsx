import React, { FC } from "react";
import { Form } from "./Form";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import styles from "./Auth.module.scss";
import { errorLogin, setUser } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

export const Login: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (email: string, password: string) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        const accessToken = await user.getIdTokenResult();
        dispatch(
          setUser({
            email: user.email,
            token: accessToken.token,
            id: user.uid,
          })
        );
        navigate("/profile");
      })
      .catch(() => dispatch(errorLogin()));
  };

  return (
    <div className={styles.form}>
      <Form title="Ввійти" handleClick={handleLogin} />
    </div>
  );
};
