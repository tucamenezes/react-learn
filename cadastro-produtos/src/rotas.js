import React from 'react'

import {Switch, Route } from 'react-router-dom'


import Home from './views/home';
import CadastroProduto from './views/produtos/cadastro';
import ConsultaProdutos from './views/produtos/consulta';


export default () => {
  return (
          <Switch>
              <Route extact path="/cadastro-produtos/:sku?" component={CadastroProduto} />
              <Route extact path="/consulta-produtos" component={ConsultaProdutos} />
              <Route extact path="/" component={Home} />>
          </Switch>
  )
}