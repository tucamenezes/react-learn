import React from 'react'
import ProdutoSevice from '../../app/produtoService'
import { withRouter } from 'react-router-dom'
import Card from '../../components/card'


const stateInicial = {
         nome : '',
         sku : '',
         descricao : '',
         preco : 0,
         fornecedor : '',
         sucesso : false ,
         errors : [],
         atualizando : false}

class CadastroProduto extends React.Component {

    state = stateInicial;

    constructor() {
        super()
        this.service = new ProdutoSevice();
    }

    onChange = (event) => {
       const valor = event.target.value;
       const nomeCampo = event.target.name;

       this.setState({[nomeCampo] : valor});
    }

    componentDidMount() {
       const sku = this.props.match.params.sku;
       console.log('cheguei')
       if (sku) {
        console.log('entrei')
         const resultado = this.service.obterProdutos()
                                       .filter(produto => produto.sku === sku)
         if (resultado.length >0) {
            console.log('enocntrei')
            
             const produtoEncontrado = resultado[0];
             //... eh responsavel por extraie as proriedades do objeto e jogar no state, - spread operator ...
             this.setState({...produtoEncontrado, atualizando : true});

             console.log(this.state.errors)
         }
       }
    
    }

    onSubmit = (event) => {
        //evita que o forulario seja enviado como um form normaol uma vez que o rec trabalha diferente 
        event.preventDefault();

        const produto = {
            nome : this.state.nome,
            sku : this.state.sku,
            descricao : this.state.descricao,
            preco : this.state.preco,
            fornecedor : this.state.fornecedor}
            try {
                this.service.salvar(produto);
                this.limpaCampos();
                this.setState({sucesso:true})
                console.log ('salvo com sucesso');
            } catch(erro) {
                console.log ('ERRO');
               const errors = erro.errors;
               this.setState({errors : errors})

            }
            

        
    }

    limpaCampos = () => {
        this.setState(stateInicial);
    }


  render() {
      return (
          <Card header={this.state.atualizando ? 'Atualização de Produto' : 'Cadastro de Produto' }> 
                <form id="frmProduto" onSubmit={this.onSubmit}>

                        {  this.state.sucesso && 

                            <div className="alert alert-dismissible alert-success">
                                <button type="button" className="close" data-dismiss="alert">&times;</button>
                                <strong>Bem feito! </strong> Cadastro realizado com sucesso.
                            </div>

                        }

                        { 
                            this.state.errors.length > 0 && 
                        
                            this.state.errors.map (msg => {
                                return (

                                <div className="alert alert-dismissible alert-danger">
                                <button type="button" className="close" data-dismiss="alert">&times;</button>
                                <strong>Erro </strong> {msg}.
                                </div>
                                )

                            })
                        }
                            
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Nome: *</label>
                                    <input type="text" 
                                        name="nome"
                                        onChange={this.onChange}
                                        value={this.state.nome}
                                        className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <label>SKU: *</label>
                                <input type="text" 
                                    name="sku" 
                                    disabled={this.state.atualizando} 
                                    onChange={this.onChange}
                                    value={this.state.sku} 
                                    className="form-control" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Descricao: *</label>
                                    <textarea name="descricao" 
                                            onChange={this.onChange}
                                            value={this.state.descricao} 
                                            className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Preco: *</label>
                                    <input type="text" 
                                        name="preco" 
                                        onChange={this.onChange}
                                        value={this.state.preco} 
                                        className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Fornecedor: *</label>
                                    <input type="text" 
                                        name="fornecedor" 
                                        onChange={this.onChange}
                                        value={this.state.fornecedor} 
                                        className="form-control" />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-1">
                                <button type="submit" className="btn btn-success"> {this.state.atualizando ? 'Atualizar' : 'Salvar' }</button>
                            </div>
                            <div className="col-md-1">
                                <button onClick={this.limpaCampos} className="btn btn-primary"> Limpar</button>
                            </div>
                        </div>
                </form>
          </Card>  
      )
  }
}


export default withRouter(CadastroProduto)