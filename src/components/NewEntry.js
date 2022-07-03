import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ThreeDots } from "react-loader-spinner";
import styled from 'styled-components';
import axios from 'axios';
import dayjs from 'dayjs';

import UserContext from "../contexts/UserContext";

function NewEntry() {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [newEntry, setNewEntry] = useState({
    type: "entry",
    value: "",
    description: "",
    date: dayjs().valueOf()
  });
  const config = {
    headers: {
      "Authorization": `Bearer ${user.token}`
    }
  };

  const navigate = useNavigate();

  function saveEntry (e) {
    e.preventDefault();
    
    setLoading(true);
    const response = axios.post('https://projeto-13-my-wallet.herokuapp.com/entry', {...newEntry}, config);
    
    response.then (() => {
      alert(`Entrada registrada com sucesso!`);
      setLoading(false);
      navigate('/');
    });
    response.catch (r => {
      alert(`Erro ${r.response.status}`);
      setLoading(false);
    });
  }

  return (
    <Container>
      <h1>Nova entrada</h1>
      <form onSubmit={saveEntry}>
        <input 
          type="number"
          step="0.01"
          value={NewEntry.value}
          onChange={(e) => setNewEntry({...newEntry, value: e.target.value})}
          placeholder="Valor"
          disabled={loading}
          required
        />
        <input
          type="text"
          value={NewEntry.description}
          onChange={(e) => setNewEntry({...newEntry, description: e.target.value})}
          placeholder="Descrição"
          disabled={loading}
          required
        />
        <input
          type="date"
          value={dayjs(newEntry.date).format('YYYY-MM-DD')}
          onChange={(e) => setNewEntry({...newEntry, date: dayjs(e.target.value).valueOf()})}
          required
        />
        <button type="submit" disabled={loading}>{loading ? <ThreeDots color="#FFFFFF" width={64} height={64} /> : "Salvar entrada"}</button>
      </form>
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

  h1 {
    font-size: 26px;
    font-weight: 700;
    color: #FFFFFF;

    margin-top: 35px;
    margin-bottom: 40px;
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

    @media screen and (max-width: 380px) {
      input {
        width: 301px;
      }

      button {
        width: 301px;
      }
    }
  }
`;

export default NewEntry;