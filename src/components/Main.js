import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Main() {
  const navigate = useNavigate();
  let userStorage = localStorage.getItem("user");

  useEffect((() => {
    if (userStorage === null) {
      return navigate('/login');
    }
  }), [navigate, userStorage]);

  return (
    <>
    <h1>TESTE MAIN</h1>
    </>
  )
}

export default Main;