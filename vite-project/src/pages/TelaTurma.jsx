import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { supabase } from '../supabase/supabaseClient'

export default function TelaTurma() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [turma, setTurma] = useState(null)
  const [atividades, setAtividades] = useState([])

  useEffect(() => {
    const buscarDados = async () => {

      const { data: dadosTurma } = await supabase
        .from('dimTurmas')
        .select('*')
        .eq('id_turma', id)
        .single()

      setTurma(dadosTurma)

      const { data: atividadesTurma } = await supabase
        .from('reAtividadeTurma')
        .select(`
          id_atividade,
          dimAtividades(nome_atividade)
        `)
        .eq('id_turma', id)

      setAtividades(atividadesTurma)
    }

    buscarDados()
  }, [id])

  const DeletarAtividade = async (id) => {
    const {error: erroRelacao} = await supabase
        .from('reAtividadeTurma')
        .delete()
        .eq('id_atividade', id)
    
    if (erroRelacao) {
        alert('Erro ao deletar relação atividade/turma: ' + erroRelacao.message)
        return
        }

    const { error: erroAtividade } = await supabase 
        .from('dimAtividades')
        .delete()
        .eq('id_atividade', id)
    
    if (erroAtividade) {
        alert('Erro ao deletar atividade: ' + erroAtividade.message)
        return
    }

    alert('Atividade excluída com sucesso!')
    setAtividades(atividades.filter((atividade) => atividade.id_atividade !== id))

  }

  return (
    <div>
      <button onClick={() => navigate('/telainicial')}>Voltar</button>
      {turma ? (
        <>
          <h2>{turma.nome_turma}</h2>
          <h3>Atividades</h3>
          {atividades.length === 0 ? (
            <p>Nenhuma atividade cadastrada</p>
            ) : (
            atividades.map((a) => (
                <div key={a.id_atividade} className="atividade-card">
                <h4>{a.dimAtividades.nome_atividade}</h4>
                <button onClick={() => DeletarAtividade(a.id_atividade)}>🗑️</button>
                </div>
            ))
            )}
        </>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  )
}