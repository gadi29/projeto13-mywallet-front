import { useState } from "react";
import styled from 'styled-components';

function NewExit() {
  const [loading, setLoading] = useState(false);
  const [newExit, setNewExit] = useState({
    value: "",
    description: ""
  });

  function save(e) {
    e.preventDefault();
    setLoading(true);
  }

  return (
    <Container>
      <h1>Nova saída</h1>
      <form onSubmit={save}>
        <input 
          type="number"
          value={NewExit.value}
          onChange={(e) => setNewExit({...newExit, value: e.target.value})}
          placeholder="Valor"
          disabled={loading}
          required
        />
        <input
          type="text"
          value={NewExit.description}
          onChange={(e) => setNewExit({...newExit, description: e.target.value})}
          placeholder="Descrição"
          disabled={loading}
          required
        />
        <button type="submit">Salvar saída</button>
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

export default NewExit;