import { useState } from "react";
import styled from 'styled-components';

function EditExit() {
  const [loading, setLoading] = useState(false);
  const [exit, setExit] = useState({
    value: "",
    description: ""
  });

  function updateExit(e) {
    e.preventDefault();
    setLoading(true);
  }

  return (
    <Body>
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
          <button type="submit">Atualizar saída</button>
        </form>
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
  margin: 25px;

  h1 {
    font-size: 26px;
    font-weight: 700;
    color: #FFFFFF;

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
  }
`;

export default EditExit;