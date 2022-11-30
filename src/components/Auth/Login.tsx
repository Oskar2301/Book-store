import React, { FC } from "react";
import { Form } from "./Form";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import styles from "./Auth.module.scss";
import { errorLogin, setUser } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { getBase } from "../../pages/Profile/FireBase/GetBase";

export const Login: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (email: string, password: string) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        const res = await getBase(user.uid!);
        dispatch(
          setUser({
            user,
            fav: res!.fav,
            orders: res!.orders,
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
