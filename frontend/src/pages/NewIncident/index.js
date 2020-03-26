import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import{ FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import './style.css';

export default function NewIncident() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState(''); 
    const [value, setValue] = useState('');
    const ongId = localStorage.getItem('ong_id');
    const history  = useHistory();

    async function handlenewIncident(e){
        e.preventDefault();
        const data = {
            title,
            description,
            value,
        }

        try{
            await api.post('incidents', data, { headers:{
                Authorization: ongId,
            }})
        }catch(err){
            alert('Erro ao cadastrar caso, tente novamente!');
        }
        history.push('/profile');
    }

    return(
<div className="newincidentcontainer">
            <div className="content">
                <section>
                    <img src={ logoImg } alt="Be The Hero"/>

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente e ajude a encontrar um heerói para resolver isso</p>
                    <Link className='backlink' to="/profile">
                       <FiArrowLeft size={16} color="#e02041" />
                       Voltar para home
                    </Link>
                </section>
                <form onSubmit={handlenewIncident}>
                    <input 
                        placeholder='Título do caso'
                        value={title}
                        onChange = {e=> setTitle(e.target.value)}
                        />
                    <textarea
                        placeholder='Descrição'
                        value={description}
                        onChange = {e=> setDescription(e.target.value)}
                        />
                    <input 
                        placeholder='Valor em Reais'
                        value={value}
                        onChange = {e=> setValue(e.target.value)}
                        />
                    <button className='button' type='submit'>Cadastrar</button>
                </form>
            </div>
        </div>    
    );
}