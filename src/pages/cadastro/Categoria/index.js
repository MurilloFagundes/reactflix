import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../componentes/PageDefault';
import FormField from '../../../componentes/FormField';
import Button from '../../../componentes/Button';

function CadastroCategoria() {
  const valoresIniciais = {
    nome: '',
    descricao: '',
    cor: '',
  };
  const [categorias, setCategorias] = useState([]);
  const [values, setValues] = useState(valoresIniciais);

  function setValue(chave, valor) {
    setValues({
      ...values,
      [chave]: valor,
    });
  }

  function handleChangeInput(info) {
    setValue(
      info.target.getAttribute('name'),
      info.target.value,
    );
  }

  useEffect(() => {
    const URL_TOP = 'http://localhost:8080/categorias';
    fetch(URL_TOP)
    .then(async (respostaDoServidor) => {
      const resposta = await respostaDoServidor.json();
      console.log(resposta);
      setCategorias([
        ...resposta,
      ]);
    });
  }, []);

  return (
    <PageDefault>
      <h1>
        Cadastro de Categoria:
        {values.nome}
      </h1>
      <form onSubmit={function handleSubmit(infosDoEvento) {
        infosDoEvento.preventDefault();
        setCategorias([
          ...categorias,
          values,
        ]);

        setValues(valoresIniciais);
      }}
      >
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
          label="Cor: "
          type="color"
          name="cor"
          value={values.cor}
          onChange={handleChangeInput}
        />

        <Button>
          Cadastrar
        </Button>

      </form>
      {categorias.length === 0 && (<div>
        Loading..
      </div>
      )}
      <ul>
        {categorias.map((categoria) => (
          <li key={`${categoria.nome}`}>
            {categoria.nome}
          </li>
        ))}
      </ul>
      <Link to="/">
        Ir para home
      </Link>
    </PageDefault>
  );
}

export default CadastroCategoria;
