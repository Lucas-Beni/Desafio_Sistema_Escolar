import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import TelaInicial from './pages/TelaInicial'
import AdicionarTurma from './pages/AdicionarTurma'
import AdicionarAtividade from './pages/AdicionarAtividade'
import TelaTurma from './pages/TelaTurma'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/telainicial" element={<TelaInicial />} />
      <Route path="/adicionarturma" element={<AdicionarTurma/>} />
      <Route path="/adicionaratividade" element={<AdicionarAtividade/>} />
      <Route path="/telaTurma/:id" element={<TelaTurma />} />
    </Routes>
  )
}