import React, { useState } from 'react';

import useStore from './somaReduce';


function ReducerHook() {

   const [numero, setNumero] = useState(0);
   const [segundoNumero, setSegundoNumero] = useState(0);
   const [store, dispach] = useStore();
   
   const somar = () => {

     const numeroInteiro = parseInt(numero);
     const segundoNumeroInteiro = parseInt(segundoNumero);
     console.log ('dispachando a action')

     dispach({
         type : 'SOMA',
         payload : numeroInteiro + segundoNumeroInteiro

     })

   }

   const subtrair = () => {

    const numeroInteiro = parseInt(numero);
    const segundoNumeroInteiro = parseInt(segundoNumero);
    console.log ('dispachando a action SUBTRACAO')

    dispach({
        type : 'SUBTRAIR',
        payload : numeroInteiro - segundoNumeroInteiro
        
    })

  }

  return (
    <div>
      Numero 1: <br/>
      <input type="text" value={numero} onChange={ e => setNumero(e.target.value)}/> <br/>
      Numero 2: <br/>
      <input type="text" value={segundoNumero} onChange={ e => setSegundoNumero(e.target.value)} /> <br/>
      <button onClick={somar}>Somar</button>
      <button onClick={subtrair}>Subtrair</button>
      Resultado: <br/>
      <input type="text" value={store.resultado} readOnly/> <br/>

    </div>
  );
}

export default ReducerHook;
