import React, { useState } from 'react';

function UserState() {

   const [numero, setNumero] = useState();
   const [segundoNumero, setSegundoNumero] = useState();
   const [resultado, setResultado] = useState();
   
   const somar = () => {
     const numeroInteiro = parseInt(numero);
     const segundoNumeroInteiro = parseInt(segundoNumero);

     setResultado(numeroInteiro + segundoNumeroInteiro)
   }

  return (
    <div>
      Numero 1: <br/>
      <input type="text" value={numero} onChange={ e => setNumero(e.target.value)}/> <br/>
      Numero 2: <br/>
      <input type="text" value={segundoNumero} onChange={ e => setSegundoNumero(e.target.value)} /> <br/>
      <button onClick={somar}>Somar</button>
      Resultado: <br/>
      <input type="text" value={resultado} /> <br/>

    </div>
  );
}

export default App;
