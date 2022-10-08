import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export function useAuth() {
  const { email, token, id, errorAuth, errorLogin } = useSelector(
    (state: RootState) => state.userReducer
  );

  return {
    isAuth: !!email,
    email,
    token,
    id,
    errorAuth,
    errorLogin,
  };
}
