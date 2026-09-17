class Produto {
    
    #preco;
    #quantidade;
  
    constructor(nome, preco, quantidade) {
      const precoNum = parseFloat(preco);
      const qtdNum = parseInt(quantidade);
  
      
      if (!nome || nome.trim() === "") {
        throw new Error("O nome do produto não pode estar em branco!");
      }
  
      if (isNaN(precoNum) || precoNum <= 0) {
        throw new Error("O preço do produto deve ser maior que zero!");
      }
  
      if (isNaN(qtdNum) || qtdNum <= 0) {
        throw new Error("A quantidade do produto deve ser maior que zero!");
      }
  
      this.nome = nome.trim();
      this.#preco = precoNum;
      this.#quantidade = qtdNum;
    }
  
    
    get preco() {
      return this.#preco;
    }
  
    get quantidade() {
      return this.#quantidade;
    }
  
    
    calcularSubtotal() {
      return this.#preco * this.#quantidade;
    }
  }
  
  
  const listaDeProdutos = [];
  
  
  const formProduto = document.getElementById("produto-form");
  
  
  formProduto.addEventListener("submit", function (event) {
    event.preventDefault();
  
    const nomeInput = document.getElementById("nome").value;
    const precoInput = document.getElementById("preco").value;
    const quantidadeInput = document.getElementById("quantidade").value;
  
    try {
      
      const novoProduto = new Produto(nomeInput, precoInput, quantidadeInput);
  
      
      listaDeProdutos.push(novoProduto);
  
      
      renderizarTabela();
      atualizarTotalEstoque();
      formProduto.reset();
  
    } catch (erro) {
      
      alert(erro.message);
    }
  });
  
  
  function atualizarTotalEstoque() {
   
    const valorTotal = listaDeProdutos.reduce((acumulador, produto) => {
      return acumulador + produto.calcularSubtotal();
    }, 0);
  
    const elementoTotal = document.getElementById("total-estoque");
    
    if (elementoTotal) {
     
      const totalFormatado = valorTotal.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
      });
      
      elementoTotal.textContent = `Total em Estoque: ${totalFormatado}`;
    }
  }
  
 
  function removerProduto(index) {
    listaDeProdutos.splice(index, 1);
    renderizarTabela();
    atualizarTotalEstoque();
  }
  
  
  const botaoLimpar = document.getElementById("limpar-tabela");
  if (botaoLimpar) {
    botaoLimpar.addEventListener("click", () => {
      listaDeProdutos.length = 0; 
      renderizarTabela();
      atualizarTotalEstoque();
    });
  }
  
 
  function renderizarTabela() {
    const tabelaBody = document.querySelector("#tabela-produtos tbody");
    if (!tabelaBody) return;
  
    tabelaBody.innerHTML = "";
  
    listaDeProdutos.forEach((produto, index) => {
      const linha = document.createElement("tr");
  
      
      const precoFormatado = produto.preco.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
      });
  
      const subtotalFormatado = produto.calcularSubtotal().toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
      });
  
      linha.innerHTML = `
        <td>${produto.nome}</td>
        <td>${precoFormatado}</td>
        <td>${produto.quantidade}</td>
        <td>${subtotalFormatado}</td>
        <td>
          <button class="btn-remover" onclick="removerProduto(${index})">Remover</button>
        </td>
      `;
  
      tabelaBody.appendChild(linha);
    });
  }
