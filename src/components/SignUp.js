import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import styled from 'styled-components';
import axios from 'axios';

function SignUp() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    name:'',
    email:'',
		password:'',
    confirm_password:''
  });

  const navigate = useNavigate();

  function registerUser(e) {
    e.preventDefault();
    
    if (user.password !== user.confirm_password) {
      return alert('Senhas não conferem.');
    }

    setLoading(true);
    const { name, email, password } = user;
    const response = axios.post('https://projeto-13-my-wallet.herokuapp.com/sign-up', { name, email, password });

    response.then(() => {
      alert(`Usuário registrado com sucesso!`);
      setLoading(false);
      navigate('/sign-in');
    });
    response.catch(r => {
      setLoading(false);
      if (r.response.status === 422) {
        alert('Algum campo está preenchido inadequadamente.');
      } else if (r.response.status === 409) {
        alert('Este usuário já existe.');
      } else {
        alert(`Erro ${r.response.status}.`);
      }
    });
  }

  return (
      <Container loading={loading}>
        <h1>MyWallet</h1>
        <form onSubmit={registerUser}>
          <input
            type="name"
            value={user.name}
            onChange={(e) => setUser({...user, name: e.target.value})}
            placeholder="Nome"
            disabled={loading}
            required
          />
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            placeholder="E-mail"
            disabled={loading}
            required
          />
          <input
            type="password"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder="Senha"
            disabled={loading}
            required
          />
          <input
            type="password"
            value={user.confirm_password}
            onChange={(e) => setUser({...user, confirm_password: e.target.value})}
            placeholder="Confirme sua senha"
            disabled={loading}
            required
          />
          <button type="submit" disabled={loading}>{loading ? <ThreeDots color="#FFFFFF" width={64} height={64} /> : "Cadastrar"}</button>
        </form>
        <Link to={'/sign-in'}>
          <p>Já tem uma conta? Entre agora!</p>
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
      cursor: ${({ loading }) => loading ? 'cursor' : 'pointer'};

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

export default SignUp;