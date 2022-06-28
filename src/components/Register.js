import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function Register() {
  const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
  const [user, setUser] = useState({
    name:'',
    email:'',
		password:''
  });

  function registerUser(e) {
    e.preventDefault();
    setLoading(true);
    
    /*const response = axios.post('', {...user});

    response.then(() => {
      setLoading(false);
      navigate('/login');
    });
    response.catch(r => {
      alert(`Erro ${r.response.status}`);
      setLoading(false);
    })*/
}

  return (
    <Body>
      <Container>
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
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder="Confirme sua senha"
            disabled={loading}
            required
          />
          <button type="submit" disabled={loading}>Cadastrar</button>
        </form>
        <Link to={'/login'}>
          <p>Já tem uma conta? Entre agora!</p>
        </Link>
      </Container>
    </Body>
  )
}

const Body = styled.body`
  width: 100%;
  height: 100vh;
`;

const Container = styled.div`    
  width: 100%;
  height: 100%;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    font-family: 'Saira Stencil One', cursive !important;
    color: #FFFFFF;
    font-size: 32px;

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
      opacity: ${({ loading }) => loading ? '0.7' : '1'};
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
  }
  p {
    color: #FFFFFF;
    font-weight: 700;
    cursor: pointer;
    
    margin-top: 36px;
  }
`;

export default Register;