import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { supabase } from '../supabase/supabaseClient'

export default function TelaInicial() {
  const navigate = useNavigate()

  const [turmas, setTurmas] = useState([])

  useEffect(() => {
    const buscarTurmas = async () => {
      const { data, error } = await supabase
        .from('dimTurmas')
        .select('*')

      if (error) {
        console.error('Erro ao buscar turmas:', error)
      } else {
        setTurmas(data)
      }
    }

    buscarTurmas()
  }, [])

  const deletarTurma = async (id) => {
    const {error} = await supabase
      .from('dimTurmas')
      .delete()
      .eq('id_turma', id)

    if (error) {
    console.error('Erro ao deletar turma:', error)
    } else {
      alert('Turma encerrada com sucesso')
      setTurmas(turmas.filter(turma => turma.id_turma !== id))
    }
  }

  const telaTurma = (id) => {
    navigate(`/telaturma/${id}`)
  }

  const adicionarTurma = () => {
    navigate('/adicionarturma')
  }

  const adicionarAtividade = () => {
    navigate('/adicionaratividade')
  }

  const fazerLogout = () => {
    navigate('/')
  }

  return (
    <div>
      <h2>Bem-vindo!</h2>
      <h2>Turmas Cadastradas</h2>
      <div className="turmas-grid">
        {turmas.length === 0 ? (
          <p>Nenhuma turma cadastrada.</p>
        ) : (
          turmas.map((turma) => (
            <div key={turma.id_turma} className="turma-card" onClick={() => telaTurma(turma.id_turma)}>
              <h3>{turma.nome_turma}</h3>
              <p>ID do Professor: {turma.id_prof}</p>
              <button onClick={(e) => {
                e.stopPropagation()
                deletarTurma(turma.id_turma)
              }}>
                🗑️
              </button>
            </div>
          ))
        )}
      </div>  
      <button onClick={adicionarTurma}>Adicionar Turma</button>
      <button onClick={adicionarAtividade}>Adicionar Atividade</button>
      <button onClick={fazerLogout}>Sair</button>
    </div>
  )
}