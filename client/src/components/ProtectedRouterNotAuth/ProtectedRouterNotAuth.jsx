import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProtectedRouter({ redirectPath = '/' }) {
  const user = useSelector((store) => store.userStore);
  console.log('===>>> 👉👉👉 file: ProtectedRouter.jsx:7 👉👉👉 user', user.user);
  if (!user.user) {
    return <Navigate to={redirectPath} replace />;
  }
  return (
    <Outlet />
  );
}
