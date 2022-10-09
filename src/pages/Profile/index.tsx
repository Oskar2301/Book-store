import React, { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeUser } from "../../redux/slices/userSlice";
import { createUserBase } from "./FireBase/DataBase";

export const Profile = () => {
  const { isAuth, userId, userEmail } = useAuth();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (isAuth) {
      createUserBase(userId!, userEmail!);
    }
  }, []);

  return isAuth ? (
    <div>
      <h1>{userEmail}</h1>
      <Link to="/" onClick={() => dispatch(removeUser())}>
        Log Out
      </Link>
    </div>
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};
