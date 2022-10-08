import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeUser } from "../../redux/slices/userSlice";

export const Profile = () => {
  const { isAuth, email } = useAuth();
  const dispatch = useDispatch();
  const location = useLocation();

  return isAuth ? (
    <div>
      <h1>{email}</h1>
      <Link to="/" onClick={() => dispatch(removeUser())}>
        Log Out
      </Link>
    </div>
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};
