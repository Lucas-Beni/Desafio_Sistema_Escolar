import { Link } from 'react-router-dom'
import { useState } from 'react'
import { supabase } from '../supabase/supabaseClient'
import { useNavigate } from 'react-router-dom'
import bcrypt from 'bcryptjs'
import '../css/Login.css'

export default function Login(){
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState(null)

  const fazerLogin = async () => {
    const {data, error} = await supabase
      .from('dimProfessores')
      .select('*')
      .eq('email_prof', email)

    if (error || !data){
      setErro('Email ou senha inválidos')
    } 

    const senhaValida = bcrypt.compareSync(senha, data[0].senha_prof)

    if (!senhaValida){
      setErro('Email ou senha inválidos')
    }else{
      alert('Login realizado com sucesso!')
      navigate('/telainicial')
    }
  }

  return (
      <div className="container-login">
          <div className='login'>
              <h2>Login</h2>
              <h4>Email</h4>
              <input type="text" placeholder='Digite seu email' value={email} onChange={e => setEmail(e.target.value)}/>
              <h4>Senha</h4>
              <input type="password" placeholder='Digite sua senha' value={senha} onChange={e => setSenha(e.target.value)}/>
              <button onClick={fazerLogin}>Login</button>
              {erro && <p style={{color: 'red'}}>{erro}</p>}
          </div>
          <p>Não tem conta? <Link to="/cadastro">Cadastre-se</Link></p>
      </div>
  )
}