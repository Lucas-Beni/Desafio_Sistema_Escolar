import { Link } from 'react-router-dom'
import { useState } from 'react'
import { supabase } from '../supabase/supabaseClient'
import { useNavigate } from 'react-router-dom'
import bcrypt from 'bcryptjs'
import '../css/Cadastro.css'

export default function Cadastro() {
  const navigate = useNavigate()
  const [nome, setNome] = useState('')
  const [cpf, setCpf] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState(null)

  const fazerCadastro = async () => {
    const salt = bcrypt.genSaltSync(10)
    const hashSenha = bcrypt.hashSync(senha, salt)

    if (!nome || !cpf || !email || !senha){
      alert('Nenhum dos campos pode ser vazio')
      return
    }

    const { data: professores, error: erroBusca } = await supabase
      .from('dimProfessores')
      .select('*')

    if (erroBusca) {
      setErro(erroBusca.message)
      return
    }

    if (professores.length > 0) {
      alert('Já existe um professor cadastrado. Não é possível adicionar outro.')
      return
    }

    const { error } = await supabase
      .from('dimProfessores')
      .insert([
        { nome_prof: nome, cpf_prof: cpf, email_prof: email, senha_prof: hashSenha }
      ])
  

    if (error) {
      setErro(error.message)
    } else {
      alert('Usuário cadastrado com sucesso')
      navigate('/') // volta para login
    }
  }

  return (
    <div className="container-cadastro">
        <div className='cadastro'>
            <h2>Cadastro</h2>
            <h4>Nome</h4>
            <input placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)}/>
            <h4>Cpf</h4>
            <input placeholder="Cpf" type='number' value={cpf} onChange={e => setCpf(e.target.value)}/>
            <h4>Email</h4>
            <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
            <h4>Senha</h4>
            <input placeholder="Senha" type="password" value={senha} onChange={e => setSenha(e.target.value)} />
            <button onClick={fazerCadastro}>Cadastrar</button>
            {erro && <p style={{color: 'red'}}>{erro}</p>}
        </div>
        <Link to="/">Voltar para Login</Link>
    </div>
  )
}