import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import UserContext from "../contexts/UserContext";

function NewEntry() {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [newEntry, setNewEntry] = useState({
    type: "entry",
    value: "",
    description: ""
  });

  function saveEntry (e) {
    e.preventDefault();
    setLoading(true);

    const config = {
      headers: {
        "Authorization": `Bearer ${user.token}`
      }
    }

    const response = axios.post('https://git.heroku.com/projeto-13-my-wallet.git/entry', {...newEntry}, config);
    response.then (r => {
      setLoading(false);
      alert(`Entrada registrada com sucesso!`);
      navigate('/');
    });
    response.catch (r => {
      setLoading(false);
      alert(`Erro ${r.response.status}`);
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
        <button type="submit">Salvar entrada</button>
      </form>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 26px;
    font-weight: 700;
    color: #FFFFFF;

    margin-top: 25px;
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