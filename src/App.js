import React, { useEffect, useState } from 'react'
import api from './services/api'
import './styles.css'

function App () {
  // defining empty repository array
  const [repos, setRepos] = useState([])

  // fetch repositories on page load
  useEffect(() => {
    api.get('repositories').then(response => {
      setRepos(response.data)
    })
  }, [])

  async function handleAddRepository () {
    const response = await api.post('repositories', {
      title: `Desafio Node.js ${Date.now()}`,
      url: 'https://github.com/...',
      techs: ['Node.js', '...']
    })
    setRepos([...repos, response.data])
  }

  async function handleRemoveRepository (id) {
    await api.delete(`repositories/${id}`)
    const newRepos = repos.filter(repo => {
      if(repo.id !== id){
        return repo
      } else {
        return false
      }
    })
    setRepos(newRepos)
  }

  return (
    <div>
      <ul data-testid='repository-list'>
        {repos.map(repo => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  )
}

export default App
