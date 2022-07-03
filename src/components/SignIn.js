import React, { useContext, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { ThreeDots } from "react-loader-spinner";
import styled from 'styled-components';
import axios from 'axios';

import UserContext from "../contexts/UserContext";

function SignIn() {
  const { setUser } = useContext(UserContext);
  const [userLogin, setUserLogin] = useState({ email:"", password:"" });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    
    setLoading(true);
    const response = axios.post("https://projeto-13-my-wallet.herokuapp.com/sign-in", {...userLogin});

    response.then(r => {
      setUser(r.data);
      setLoading(false);
      navigate('/');
    });
    response.catch(r => {
        setLoading(false);
        if (r.response.status === 401) {
          alert('Email ou senha não conferem.');
        } else {
          alert(`Erro ${r.response.status}! Tente novamente...`);
        }
    });
  }

  return (
      <Container loading={loading} >
        <h1>MyWallet</h1>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={userLogin.email}
            onChange={(e) => setUserLogin({...userLogin, email:e.target.value})}
            placeholder="E-mail"
            disabled={loading}
            required
          />
          <input
            type="password"
            value={userLogin.password}
            onChange={(e) => setUserLogin({...userLogin, password:e.target.value})}
            placeholder="Senha"
            disabled={loading}
            required
          />
          <button type="submit" disabled={loading}>{loading ? <ThreeDots color="#FFFFFF" width={64} height={64} /> : "Entrar"}</button>
        </form>
        <Link to={'/sign-up'}>
          <p>Primeira vez? Cadastre-se!</p>
        </Link>
      </Container>
  );
}

const Container = styled.div`    
  background-color: #8C11BE;
  
  width: 100%;
  height: 100vh;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    font-family: 'Saira Stencil One', cursive !important;
    color: #FFFFFF;
    font-size: 32px;
    cursor: default;

    margin-bottom: 25px;
  }

  form {
    display: flex;
    flex-direction: column;

    input {
      outline: none;
      background-color: ${({ loading }) => loading ? "#F2F2F2" : "#FFFFFF"};
      border: none;
      border-radius: 5px;
      
      width: 326px;
      height: 58px;
      padding: 0 15px;
      margin-bottom: 13px;

      font-size: 20px;
      color: ${({ loading }) => loading ? "#666666" : "#000000"};

      &::placeholder {
        color: #000000;
        font-size: 20px;
      }
    }

    button {
      background-color: #A328D6;
      border: none;
      border-radius: 5px;
      cursor: pointer;

      width: 326px;
      height: 46px;

      display: flex;
      justify-content: center;
      align-items: center;

      color: #FFFFFF;
      font-size: 20px;
      font-weight: 700;
    }

    @media screen and (max-width: 380px) {
      input {
        width: 301px;
      }

      button {
        width: 301px;
      }
    }
  }

  p {
    color: #FFFFFF;
    font-weight: 700;
    cursor: pointer;
    
    margin-top: 36px;
  }
`;

export default SignIn;