import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import TelaInicial from './pages/TelaInicial'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/telainicial" element={<TelaInicial />} />
    </Routes>
  )
}