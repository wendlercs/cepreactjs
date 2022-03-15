import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './styles.css';
import api from './services/api'

function App() {


  const[input, setInput] = useState('');
  const[cep, setCep] = useState('');

  async function handleSearch(){
    
    if (input === ''){
      alert("Digite um CEP!")
      return;
    }

    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");
    }

    catch{
      alert("Ocorreu um Erro!");
      setInput("")

    }

  }

  return (
    <div className="container">
      <h1 className="title"> Buscar Cep </h1>

      <div className="containerInput">
        <input type="text" placeholder="Digite o CEP desejado" value={input} onChange ={(e) => setInput(e.target.value)}></input>

        <button className="buttonSearch" onClick={handleSearch}> <FiSearch size={25} color="#FFF" /> </button>

      </div>


      {Object.keys(cep).length > 0 && (
            <main className='main'>
              <h2> CEP: {cep.cep}</h2>
              <span>Rua: {cep.logradouro}</span>
              <span>Complemento: {cep.complemento} </span>
              <span>Bairro: {cep.bairro}</span>
              <span>Cidade e estado: {cep.localidade} - {cep.uf}</span>
      
            </main>
      )}


    </div>
  );
}

export default App;
