import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function Main() {
  const navigate = useNavigate();
  let userStorage = localStorage.getItem("user");

  /*useEffect((() => {
    if (userStorage === null) {
      return navigate('/login');
    }
  }), [navigate, userStorage]);*/

  return (
      <Container>
        <Top>
          <h1>Olá, Fulano</h1>
          <div onClick={() => navigate('/login')}>
            <ion-icon name="exit-outline"></ion-icon>
          </div>
        </Top>
        <Center>

        </Center>
        <Bottom>
          <Link to={'/new_entry'}>
            <button>
              <ion-icon name="add-circle-outline"></ion-icon>
              Nova entrada
            </button>
          </Link>
          <Link to={'/new_exit'}>
            <button>
              <ion-icon name="remove-circle-outline"></ion-icon>
              Nova saída
            </button>
          </Link>
        </Bottom>
      </Container>
  )
}

const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
    cursor: pointer;
  }
`;

const Center = styled.div`
  background-color: #FFFFFF;
  border-radius: 5px;

  width: 87%;
  height: 67vh;
  margin-top: 22px;
  margin-bottom: 13px;
`;

const Bottom = styled.div`
  width: 87%;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  button {
    background-color: #A328D6;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    width: 155px;
    height: 114px;
    margin-right: 17px;
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
`;

export default Main;