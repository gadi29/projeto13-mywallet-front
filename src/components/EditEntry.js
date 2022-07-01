import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import axios from 'axios';

import UserContext from "../contexts/UserContext";

function EditEntry() {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [entry, setEntry] = useState({
    value: "",
    description: ""
  });
  const { id } = useParams();

  useEffect((() => {
    const response = axios.get(`http://localhost:5000/registers/${id}`);

    response.then(r => {
      setEntry({value:r.data.value, description:r.data.description});
    });
    response.catch(r => alert(`Erro ${r.response.status}`));
  }), []);

  function updateEntry(e) {
    e.preventDefault();
    setLoading(true);

    const config = {
      headers: {
        "Authorization": `Bearer ${user.token}`
      }
    }

    const response = axios.put(`http://localhost:5000/registers/${id}`, {...entry}, config);

    response.then(r => {
      setLoading(false);
      alert("Registro atualizado com sucesso!");
      navigate('/');
    });
    response.catch(r => {
      setLoading(false);
      alert(`Erro ${r.response.status}`);
    })
  }

  return (
    <Container>
      <h1>Editar entrada</h1>
      <form onSubmit={updateEntry}>
        <input 
          type="number"
          value={entry.value}
          onChange={(e) => setEntry({...entry, value: e.target.value})}
          placeholder="Valor"
          disabled={loading}
          required
        />
        <input
          type="text"
          value={entry.description}
          onChange={(e) => setEntry({...entry, description: e.target.value})}
          placeholder="Descrição"
          disabled={loading}
          required
        />
        <button type="submit">Atualizar entrada</button>
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

export default EditEntry;