import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import axios from 'axios';
import { ThreeDots } from "react-loader-spinner";
import dayjs from "dayjs";

import UserContext from "../contexts/UserContext";

function EditExit() {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [exit, setExit] = useState({
    value: "",
    description: "",
    date: dayjs().valueOf()
  });

  const config = {
    headers: {
      "Authorization": `Bearer ${user.token}`
    }
  };

  useEffect((() => {
    setLoading(true);
    const response = axios.get(`https://projeto-13-my-wallet.herokuapp.com/register/${id}`, config);

    response.then(r => {
      setExit({value:r.data.value, description:r.data.description, date:r.data.date});
      setLoading(false);
    });
    response.catch(r => {
      setLoading(false);
      alert(`Erro ${r.response.status}`);
    });
  }), []);

  function updateExit(e) {
    e.preventDefault();
    setLoading(true);

    const response = axios.put(`https://projeto-13-my-wallet.herokuapp.com/registers/${id}`, {...exit}, config);

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
      <h1>Editar saída</h1>
      <form onSubmit={updateExit}>
        <input 
          type="number"
          value={exit.value}
          onChange={(e) => setExit({...exit, value: e.target.value})}
          placeholder="Valor"
          disabled={loading}
          required
        />
        <input
          type="text"
          value={exit.description}
          onChange={(e) => setExit({...exit, description: e.target.value})}
          placeholder="Descrição"
          disabled={loading}
          required
        />
        <input
          type="date"
          value={dayjs(exit.date).format('YYYY-MM-DD')}
          onChange={(e) => setExit({...exit, date: dayjs(e.target.value).valueOf()})}
          required
        />
        <p>Formato: Mês / Dia / Ano</p>
        <button type="submit" disabled={loading}>{loading ? <ThreeDots color="#FFFFFF" width={64} height={64} /> : "Atualizar saída"}</button>
      </form>
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

    input:last-of-type {
      margin-bottom: 8px;
    }

    p {
      color: #FFFFFF;
      font-size: 15px;

      margin-left: 10px;
      margin-bottom: 13px;
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

export default EditExit;