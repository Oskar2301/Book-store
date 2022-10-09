import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export function useAuth() {
  const { userId, userEmail, errorAuth, errorLogin } = useSelector(
    (state: RootState) => state.userReducer
  );

  return {
    isAuth: !!userEmail,
    userId,
    userEmail,
    errorAuth,
    errorLogin,
  };
}
