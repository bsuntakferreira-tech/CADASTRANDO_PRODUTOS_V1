class Produto {

    #preco;
    #quantidade;

    constructor(nome, preco, quantidade) {

        this.nome = nome;
        this.#preco = parseFloat(preco);
        this.#quantidade = parseInt(quantidade);

        if (nome.trim() === "") {
            throw new Error("O nome do produto não pode estar em branco!");
        }

        if (this.#preco <= 0) {
            throw new Error("O preço deve ser maior que zero!");
        }

        if (this.#quantidade <= 0) {
            throw new Error("A quantidade deve ser maior que zero!");
        }
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


// CADASTRAR PRODUTO
formProduto.addEventListener("submit", function(event) {

    event.preventDefault();

    const nomeInput = document.getElementById("nome").value;
    const precoInput = document.getElementById("preco").value;
    const quantidadeInput = document.getElementById("quantidade").value;

    try {

        const novoProduto = new Produto(
            nomeInput,
            precoInput,
            quantidadeInput
        );

        listaDeProdutos.push(novoProduto);

        renderizarTabela();

        formProduto.reset();

    } catch (erro) {

        alert(erro.message);

    }
});


// MOSTRAR PRODUTOS NA TABELA
function renderizarTabela() {

    const tabelaBody = document.querySelector("#tabela-produtos tbody");

    tabelaBody.innerHTML = "";

    listaDeProdutos.forEach((produto, index) => {

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${produto.nome}</td>
            <td>R$ ${produto.preco.toFixed(2)}</td>
            <td>${produto.quantidade}</td>
            <td>R$ ${produto.calcularSubtotal().toFixed(2)}</td>
            <td>
                <button class="btn-remover" onclick="removerProduto(${index})">
                    Remover
                </button>
            </td>
        `;

        tabelaBody.appendChild(linha);
    });

    atualizarTotalEstoque();
}


// CALCULAR TOTAL DO ESTOQUE
function atualizarTotalEstoque() {

    const total = listaDeProdutos.reduce((soma, produto) => {
        return soma + produto.calcularSubtotal();
    }, 0);

    document.getElementById("total do estoque").textContent =
        `Total em Estoque: R$ ${total.toFixed(2)}`;
}


// REMOVER UM PRODUTO
function removerProduto(index) {

    listaDeProdutos.splice(index, 1);

    renderizarTabela();
}


// LIMPAR TODOS OS PRODUTOS
const botaoLimpar = document.getElementById("limpar a tabela");

botaoLimpar.addEventListener("click", function() {

    listaDeProdutos.length = 0;

    renderizarTabela();
});
