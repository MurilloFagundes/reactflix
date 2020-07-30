import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../componentes/PageDefault'
import FormField from '../../../componentes/Carousel/components/FormField';

function CadastroCategoria() {
    const valoresIniciais = {
        nome: '',
        descricao: '',
        cor: ''
    }
    const [categorias, setCategorias] = useState([]);
    const [values, setValues] = useState(valoresIniciais);
    
    
    function setValue(chave, valor) {
        setValues({
            ...values,
            [chave]: valor,
        })
    }

    function handleChangeInput(info) { 
        setValue(
            info.target.getAttribute('name'), 
            info.target.value
            ); 
    }

    return (
        <PageDefault>
            <h1>Cadastro de Categoria: {values.nome}</h1>
            <form onSubmit={function handleSubmit(infosDoEvento) {
                infosDoEvento.preventDefault();
                setCategorias([
                    ...categorias,
                    values
                ]);

                setValues(valoresIniciais);
            }}>
                <FormField
                label="Nome da Catergoria: "
                type="text"
                name="nome"
                value={values.nome}
                onChange={handleChangeInput} 
                />

                <FormField 
                label="Descrição: "
                type="textarea"
                name="descricao"
                value={values.descricao}
                onChange={handleChangeInput} 
                />
                
                <FormField 
                    label="Cor da Categoria: "
                    type="color"
                    name="cor"
                    value={values.cor}
                    onChange={handleChangeInput}
                />

                <button>
                    Cadastrar
                </button>

            </form>
            <ul>
                {categorias.map((categoria, indice) => {
                    return (
                        <li key={`${categoria}${indice}`}>
                            {categoria.nome}
                        </li>
                    )
                })}
            </ul>
            <Link to="/">
                Ir para home
            </Link>
        </PageDefault>
    )
}

export default CadastroCategoria;