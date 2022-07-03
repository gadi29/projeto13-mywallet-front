import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MutatingDots } from 'react-loader-spinner';
import styled from 'styled-components';
import axios from 'axios';
import dayjs from 'dayjs';

import ShowRegisters from './ShowRegisters';
import UserContext from "../contexts/UserContext";

function Main() {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [monthRegisters, setMonthRegisters] = useState([]);
  const [reloadRegisters, setReloadRegisters] = useState(true);
  const [date, setDate] = useState(dayjs());
  const config = {
    headers: {
      "Authorization": `Bearer ${user.token}`
    }
  };

  const navigate = useNavigate();

  function orderArrayByDate (a, b) {
    if (a.date > b.date) {
      return 1;
    }
    if (a.date < b.date) {
      return -1;
    }
    return 0;
  }

  useEffect((() => {
    setLoading(true);
    const response = axios.get(`https://projeto-13-my-wallet.herokuapp.com/registers/${date.format('MM-YYYY')}`, config);

    response.then(r => {
      setMonthRegisters([...r.data].sort(orderArrayByDate));
      setLoading(false);
    });
    response.catch(r => {
      if (r.response.status === 401) {
        return navigate('/sign-in');
      };
      alert(`Erro ${r.response.status}`);
      setLoading(false);
    });
  }), [reloadRegisters, date]);

  function exitUser () {
    if (window.confirm("Tem certeza que deseja sair?")) {
      navigate('/sign-in');
    }
  }

  return (
      <Container>
        <Top loading={loading}>
          <h1>Olá, {user.name}</h1>
          <div onClick={exitUser}>
            <ion-icon name="exit-outline"></ion-icon>
          </div>
        </Top>
        <Center loading={loading}>
          {loading ? <MutatingDots ariaLabel="loading-indicator" /> 
          : <ShowRegisters monthRegisters={monthRegisters} config={config} date={date} setDate={setDate} setLoading={setLoading} reloadRegisters={reloadRegisters} setReloadRegisters={setReloadRegisters}/>
          }
        </Center>
        <Bottom loading={loading}>
          <Link to={'/new_entry'}>
            <button disabled={loading}>
              <ion-icon name="add-circle-outline"></ion-icon>
              Nova entrada
            </button>
          </Link>
          <Link to={'/new_exit'}>
            <button disabled={loading}>
              <ion-icon name="remove-circle-outline"></ion-icon>
              Nova saída
            </button>
          </Link>
        </Bottom>
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
`;

const Top = styled.div`
  width: 87%;
  margin-top: 25px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    font-size: 26px;
    font-weight: 700;
    color: #FFFFFF;
  }

  ion-icon {
    font-size: 30px;
    color: #FFFFFF;
    cursor: ${({ loading }) => loading ? "initial" : "pointer"};
  }
`;

const Center = styled.div`
  background-color: ${({ loading }) => loading ? "#F5F5F5" : "#FFFFFF"};
  border-radius: 5px;

  width: 87%;
  height: 63vh;
  margin-top: 10px;
  margin-bottom: 13px;
  padding: 0 20px;
  
  overflow: scroll;
  display: flex;
  justify-content: center;
  align-items: center;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Bottom = styled.div`
  width: 87%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    background-color: ${({ loading }) => loading ? "#A341BE" : "#A328D6"};
    border: none;
    border-radius: 5px;
    cursor: ${({ loading }) => loading ? "initial" : "pointer"};

    width: 155px;
    height: 114px;
    padding: 10px 0;
    padding-left: 10px;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;

    color: #FFFFFF;
    font-size: 17px;
    font-weight: 700;

    ion-icon {
      font-size: 24px;
    }
  }

  @media screen and (max-width: 380px) {
    button {
      width: 130px;
    }
  }
`;

export default Main;