'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';

const LogoutButton = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    // Redirecione se necessário
  };

  return (
    <button onClick={handleLogout}>Sair</button>
  );
};

export default LogoutButton; 