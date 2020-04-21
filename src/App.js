import React, { useState, useEffect } from 'react';

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });

  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {

      title: "Projeto ReactJS",
      url: "https://github.com/joaobrrj/projetoReactJS",
      techs: ["ECMASCRIPT", "ReactJS"]

    });

    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);

    if (response.status !== 204) {
      alert('Não foi possível deletar repositório');
      return;
    }

    const newRepositories = repositories.filter(
      repository => repository.id !== id
    );

    setRepositories(newRepositories);

  }

  return (
    <>

      <ul data-testid="repository-list">
        {
          repositories
            .map(repository =>
              <li key={repository.id}>
                {repository.title}
                <button onClick={() => handleRemoveRepository(repository.id)}> Remover </button>
              </li>
            )
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>

    </>
  );
}

export default App;
