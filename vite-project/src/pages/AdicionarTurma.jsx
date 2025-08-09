import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { supabase } from '../supabase/supabaseClient'
import '../css/adicionarTurma.css'

export default function AdicionarTurma(){
    const navigate = useNavigate()

    const [nome, setNome] = useState('')

    const voltar = () => {
        navigate('/telainicial')
    }

    const adicionarTurma = async () => {
        const {data: professorLogado} = await supabase
            .from('dimProfessores')
            .select('*')
            .single()

        const {error} = await supabase
            .from('dimTurmas')
            .insert([
                {nome_turma: nome, id_prof: professorLogado.id_prof}
            ])
        
        if (error){
            alert(error.message)
        }else{
            alert('Turma cadastrada com sucesso')
            navigate('/telainicial')
        }
    }

    return (
    <div className="container-add-turma">
        <h2>Adicionar Turma</h2>
        <div className="add-turma">
            <h4>Nome da Turma</h4>
            <input type="text" placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)}/>
            <button onClick={adicionarTurma}>Adicionar</button>
        </div>
        <button id='voltar' onClick={voltar}>Voltar</button>
    </div>
    )
}