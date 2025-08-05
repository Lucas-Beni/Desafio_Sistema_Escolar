import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/')
  }

  return (
    <div>
      <h2>Bem-vindo!</h2>
      <button onClick={handleLogout}>Sair</button>
    </div>
  )
}