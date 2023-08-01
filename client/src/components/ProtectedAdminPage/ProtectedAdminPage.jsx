import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProtectedAdminPage({ redirectPath = '/' }) {
  const user = useSelector((store) => store.userStore);
  // console.log('===>>> 👉👉👉 file: ProtectedAdminPage.jsx:7 👉👉👉 user', user.user?.isAdmin);
  if (!user.user?.isAdmin) {
    return <Navigate to={redirectPath} replace />;
  }
  return (
    <Outlet />
  );
}
