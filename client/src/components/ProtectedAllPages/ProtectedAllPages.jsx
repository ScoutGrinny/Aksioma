import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedAllPages({ redirectPath = '/' }) {
  return (
    <Navigate to={redirectPath} replace />
  );
}
