import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { supabase } from '../supabase/supabaseClient'

export default function AdicionarAtividade(){
    const navigate = useNavigate()
    const [turmas, setTurmas] = useState([])
    const [nome, setNome] = useState('')
    const [turmaSelecionada, setTurmaSelecionada] = useState('')

    const voltar = () => {
        navigate('/telainicial')
    }

    useEffect(() => {
        const buscarTurmas = async () => {
            const {data, error} = await supabase
                .from('dimTurmas')
                .select('id_turma, nome_turma')

        if (error) {
                console.error(error)
            } else {
                setTurmas(data)
            }
        }

        buscarTurmas()
    }, [])

    const adicionarAtividade = async () => {

        if (!nome || !turmaSelecionada) {
            alert('Preencha todos os campos')
            return
        }

        const { data: atividade, error: erroAtividade } = await supabase
            .from('dimAtividades')
            .insert([{ nome_atividade: nome }])
            .select()

        if (erroAtividade) {
            alert(erroAtividade.message)
            return
        }

        const idAtividade = atividade[0].id_atividade

        const { error: erroRelacao } = await supabase
            .from('reAtividadeTurma')
            .insert([{ id_atividade: idAtividade, id_turma: turmaSelecionada }])

        if (erroRelacao) {
            alert(erroRelacao.message)
        } else {
            alert('Atividade cadastrada com sucesso')
            navigate('/telainicial')
        }
    }

    return (
        <div className="container">
        <h4>Nome da Atividade</h4>
        <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={e => setNome(e.target.value)}
        />

        <h4>Selecione a Turma</h4>
        <select
            value={turmaSelecionada}
            onChange={e => setTurmaSelecionada(e.target.value)}
        >
            <option value="">Selecione uma turma</option>
            {turmas.map(turma => (
            <option key={turma.id_turma} value={turma.id_turma}>
                {turma.nome_turma}
            </option>
            ))}
        </select>

        <button onClick={adicionarAtividade}>Adicionar</button>
        <button onClick={voltar}>Voltar</button>
        </div>
  )
}