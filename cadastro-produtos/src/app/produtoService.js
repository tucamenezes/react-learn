
const PRODUTOS = '_PRODUTOS';


export function ErroValidacao (errors) {
    this.errors = errors;
}

export default class ProdutoService {
  

 obterProdutos = () => {
    const produtos = localStorage.getItem(PRODUTOS);
    
    if (!produtos) {
        return [];
    } 
    
    return JSON.parse(produtos);
 }

 validar = (produto) => {
     const errors = [];
      
     if (!produto.nome) {
        errors.push('O preenchimento do campo NOME é obrigatótrio');
     }
     if (!produto.sku) {
        errors.push('O preenchimento do campo SKU é obrigatótrio');
     }

     if (!produto.descricao) {
        errors.push('O preenchimento do campo DESCRICAO é obrigatótrio');
     }

     if (!produto.preco || produto.preco <= 0) {
        errors.push('O preenchimento do PREÇO nome é obrigatótrio');
     }
     if (!produto.fornecedor) {
        errors.push('O preenchimento do campo FORNECEDOR é obrigatótrio');
     }

     if (errors.length > 0) {
         throw new ErroValidacao(errors);
     }
 }

 obterIndex = (sku) => {
     let index = null;
     this.obterProdutos().forEach( (produto, i) => {
         if (produto.sku === sku) {
             index = i;
         }
     })
     return index;
 }

 salvar = (produto) => {
    
    this.validar(produto);

    let produtos = this.obterProdutos();
    
   const index = this.obterIndex(produto.sku);

    if (index === null) {
        produtos.push(produto);
    } else {
        produtos[index] = produto;
    }

    localStorage.setItem(PRODUTOS, JSON.stringify(produtos));
 }

 deletar = (sku) => {
     const index = this.obterIndex(sku);

     if (index !==null) {
         const produtos = this.obterProdutos();
         produtos.splice(index, 1);
         localStorage.setItem(PRODUTOS, JSON.stringify(produtos));
         return produtos;
     }
     
 }


}

