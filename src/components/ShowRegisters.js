import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import dayjs from 'dayjs';

function ShowRegisters ({ monthRegisters, config, date, setDate, setLoading, reloadRegisters, setReloadRegisters }) {
  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  const actualMonth = months[date.month()];
  let monthSold = 0;

  const navigate = useNavigate();

  for (let i = 0; i < monthRegisters.length; i++) {
    if (monthRegisters[i].type === "entry") {
      monthSold += Number(monthRegisters[i].value);
    } else if (monthRegisters[i].type === "exit") {
      monthSold -= Number(monthRegisters[i].value);
    }
  }

  function editRegister (register) {
    if (register.type === "entry") {
      navigate(`/edit_entry/${register._id}`);
    } else if (register.type === "exit") {
      navigate(`/edit_exit/${register._id}`);
    }
  }

  function deleteRegister (register) {
    if (window.confirm("Você tem certeza que quer apagar este registro?")) {
      const response = axios.delete(`https://projeto-13-my-wallet.herokuapp.com/registers/${register._id}`, config);
      setLoading(true);

      response.then(() => {
        setReloadRegisters(!reloadRegisters);
      });
      response.catch(r => {
        alert(r.response.status);
        setLoading(false);
      });
    }
  }

  return (
    <Container>
      <Top>
        <SelectMonth>
          <p onClick={() => setDate(date.subtract(1, 'month'))}>{`<`}</p>
          <h4>{actualMonth}</h4>
          <p onClick={() => setDate(date.add(1, 'month'))}>{`>`}</p>
        </SelectMonth>
        {monthRegisters.length > 0 ? 
        <RegistersList>
          {monthRegisters.map(register => 
            <Register type={register.type}>
              <div>
                <span>{dayjs(register.date).format('DD/MM')}</span>
                <h3 onClick={() => editRegister(register)}>{register.description}</h3>
              </div>
              <div>
                <h2>{Number(register.value).toFixed(2).replace('.', ',')}</h2>
                <span onClick={() => deleteRegister(register)}>X</span>
              </div>
            </Register>
          )}
        </RegistersList> : <NoRegisters>Não há registros neste mês</NoRegisters>}
      </Top>
      <Sold monthSold={monthSold} >
        <h1>SALDO MENSAL</h1>
        <h2>{monthSold.toFixed(2).replace('-','').replace('.',',')}</h2>
      </Sold>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
`;

const SelectMonth = styled.div`
  margin-top: 25px;
  margin-bottom: 25px;

  display: flex;
  justify-content: center;
  align-items: center;
  
  p {
    color: #8C11BE;
    font-size: 20px;
    font-weight: 700;

    cursor: pointer;
  }

  h4 {
    color: #8C11BE;
    font-size: 20px;
    font-weight: 700;

    margin: 0 15px;
  }
`;

const NoRegisters = styled.h2`
  font-size: 18px;
  color: #C2C2C2;

  text-align: center;
`;

const RegistersList = styled.div `
  display: flex;
  flex-direction: column;
`;

const Register = styled.div `
  margin-bottom: 18px;
  
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
  }

  span {
    font-size: 16px;
    color: #C6C6C6;

    margin-right: 10px;
  }

  h3 {
    font-size: 16px;
    color: #000000;
    cursor: pointer;
  }

  h2 {
    font-size: 16px;
    color: ${({ type }) => type === 'entry' ? "#03AC00" : "#C70000"};

    margin-right: 13px;
  }

  span:last-child {
    font-size: 18px;
    color: #C6C6C6;
    cursor: pointer;
  }
`;

const Sold = styled.div`
  margin-top: 25px;
  margin-bottom: 35px;

  display: flex;
  justify-content: space-between;

  h1 {
    font-size: 17px;
    font-weight: 700;
    color: #000000;
  }

  h2 {
    font-size: 17px;
    color: ${({ monthSold }) => monthSold > 0 ? "#03AC00" : "#C70000"}
  }
`;

export default ShowRegisters;