import React from 'react'
import ProdutoSevice from '../../app/produtoService'
import { withRouter } from 'react-router-dom'
import Card from '../../components/card'
import ProdutosTable from './produtosTable'

class ConsultaProdutos extends React.Component {
  state = {
      produtos : []
  }
  
  constructor() {
    super()
    this.service = new ProdutoSevice();
  }

  componentDidMount() {
      const produtos = this.service.obterProdutos();
      this.setState({produtos});
      // ou this.setState(produtos : produtos);
  }

  preparaEditar = (sku) => {
      console.log('SKU');
      console.log(sku);
   this.props.history.push(`/cadastro-produtos/${sku}`);

  }

  deletar = (sku) => {

    const produtos = this.service.deletar(sku);
    this.setState({produtos});
  }

 render() {
     return (
        <Card header = "Consulta de Produto"> 
            <ProdutosTable produtos={this.state.produtos} 
                           editarAction={this.preparaEditar}
                           deletarAction={this.deletar}>
            </ProdutosTable>    
        </Card>
     )
 }


} 

export default withRouter(ConsultaProdutos)