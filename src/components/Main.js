import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { MutatingDots } from 'react-loader-spinner';
import dayjs from 'dayjs';

import UserContext from "../contexts/UserContext";

function Main() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [cashFlow, setCashFlow] = useState([]);
  const [loading, setLoading] = useState(false);
  const [getRegisters, setGetRegisters] = useState(0);
  const [date, setDate] = useState(dayjs());
  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  const config = {
    headers: {
      "Authorization": `Bearer ${user.token}`
    }
  };

  useEffect((() => {
    setLoading(true);
    const response = axios.get(`https://projeto-13-my-wallet.herokuapp.com/registers/${date.format('MM-YYYY')}`, config);

    response.then(r => {
      setCashFlow([...r.data]);
      setLoading(false);
    });
    response.catch(r => {
      if (r.response.status === 401) {
        return navigate('/login');
      };
      alert(`Erro ${r.response.status}`);
      setLoading(false);
    })
  }), [getRegisters, date]);

  let sold = 0;
  for (let i = 0; i < cashFlow.length; i++) {
    if (cashFlow[i].type === "entry") {
      sold += Number(cashFlow[i].value);
    } else if (cashFlow[i].type === "exit") {
      sold -= Number(cashFlow[i].value);
    }
  };

  function editRegister (register) {
    if (register.type === "entry") {
      navigate(`/edit_entry/${register._id}`);
    } else if (register.type === "exit") {
      navigate(`/edit_exit/${register._id}`);
    }
  };

  function deleteRegister (register) {
    if (window.confirm("Você tem certeza que quer apagar este registro?")) {
      const response = axios.delete(`https://projeto-13-my-wallet.herokuapp.com/registers/${register._id}`, config)
      setLoading(true);

      response.then(() => {
        setGetRegisters(getRegisters + 1);
      });
      response.catch(r => {
        setLoading(false);
        alert(r.response.status);
      });
    };
  };

  return (
      <Container>
        <Top loading={loading}>
          <h1>Olá, {user.name}</h1>
          <div onClick={() => {
            if (window.confirm("Tem certeza que deseja sair?")) {
              navigate('/login');
            }
        }}>
            <ion-icon name="exit-outline"></ion-icon>
          </div>
        </Top>
        <SelectMonth loading={loading}>
          <p onClick={() => setDate(date.subtract(1, 'month'))}>{`<`}</p>
          <h4>{months[date.month()]}</h4>
          <p onClick={() => setDate(date.add(1, 'month'))}>{`>`}</p>
        </SelectMonth>
        <Center loading={loading}>
          {loading ? <MutatingDots ariaLabel="loading-indicator" /> : 
            <>
              <DivCash>
                {cashFlow.map(cash => 
                  <Div type={cash.type}>
                    <div>
                      <span>{dayjs(cash.date).format('DD/MM')}</span>
                      <h3 onClick={() => editRegister(cash)}>{cash.description}</h3>
                    </div>
                    <div>
                      <h2>{Number(cash.value).toFixed(2).replace('.', ',')}</h2>
                      <span onClick={() => deleteRegister(cash)}>X</span>
                    </div>
                  </Div>
                )}
              </DivCash>
              <DivSaldo sold={sold} >
                <h1>SALDO MENSAL</h1>
                <h2>{sold.toFixed(2).replace('-','').replace('.',',')}</h2>
              </DivSaldo>
            </>
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
  )
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

const SelectMonth = styled.div`
  width: 87%;
  margin-top: 20px;

  display: flex;
  justify-content: center;
  align-items: center;
  
  p {
    color: #FFFFFF;
    font-size: 20px;
    font-weight: 700;

    cursor: ${({ loading }) => loading ? "initial" : "pointer"};
  }

  h4 {
    color: #FFFFFF;
    font-size: 20px;
    font-weight: 700;

    margin: 0 15px;
  }
`;

const Center = styled.div`
  background-color: ${({ loading }) => loading ? "#F5F5F5" : "#FFFFFF"};
  border-radius: 5px;

  width: 87%;
  height: 65vh;
  margin-top: 10px;
  margin-bottom: 13px;
  padding: 35px 20px;

  display: flex;
  flex-direction: ${({ loading }) => loading ? "row" : "column"};
  justify-content: ${({ loading }) => loading ? "center" : "space-between"};
  align-items: ${({ loading }) => loading ? "center" : "initial"};
`;

const DivCash = styled.div `
  background-color: inherit;

  display: flex;
  flex-direction: column;
`;

const Div = styled.div `
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
  background-color: inherit;

  div {
    background-color: inherit;
    display: flex;
  }

  span {
    background-color: inherit;
    font-size: 16px;
    color: #C6C6C6;

    margin-right: 10px;
  }

  h3 {
    background-color: inherit;
    font-size: 16px;
    color: #000000;
    cursor: pointer;
  }

  h2 {
    background-color: inherit;
    font-size: 16px;
    color: ${({ type }) => type === 'entry' ? "#03AC00" : "#C70000"};
    margin-right: 13px;
  }

  span:last-child {
    background-color: inherit;
    font-size: 18px;
    color: #C6C6C6;
    cursor: pointer;
  }
`;

const DivSaldo = styled.div`
  background-color: inherit;

  display: flex;
  justify-content: space-between;

  h1 {
    background-color: inherit;
    font-size: 17px;
    font-weight: 700;
    color: #000000;
  }

  h2 {
    background-color: inherit;
    font-size: 17px;
    color: ${({ sold }) => sold > 0 ? "#03AC00" : "#C70000"}
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
      background-color: #A328D6;
    }
  }

  @media screen and (max-width: 380px) {
    button {
      width: 130px;
    }
  }
`;

export default Main;