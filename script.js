// Função de pesquisa na tabela
function searchTable() {
    const searchValue = document.getElementById('search').value.toLowerCase();
    const rows = document.querySelectorAll('#stock-table tbody tr');
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const productName = cells[1].textContent.toLowerCase();
        const category = cells[2].textContent.toLowerCase();
        if (productName.includes(searchValue) || category.includes(searchValue)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Função de filtro por categoria
function filterTable() {
    const filterValue = document.getElementById('filter-category').value.toLowerCase(); // Pega o valor do filtro
    const rows = document.querySelectorAll('#stock-table tbody tr');
    rows.forEach(row => {
        const category = row.querySelector('td:nth-child(3)').textContent.toLowerCase(); // Acessa a categoria da linha
        if (filterValue === '' || category.includes(filterValue)) { // Verifica se a categoria corresponde
            row.style.display = ''; // Exibe a linha
        } else {
            row.style.display = 'none'; // Oculta a linha
        }
    });
}

// Função para alternar a animação ao clicar no menu de categoria
document.getElementById('filter-category').addEventListener('focus', function () {
    // Adiciona a classe 'open' quando o select é clicado ou ativado
    document.querySelector('.search-filter').classList.add('open');
});

document.getElementById('filter-category').addEventListener('blur', function () {
    // Remove a classe 'open' quando o select perde o foco
    document.querySelector('.search-filter').classList.remove('open');
});



const tabelaHTML = document.getElementById("tabela")
console.log(tabelaHTML)

var listaProdutos = [
    { nome: "Caixao Simples", descricao: "Caixao", qtde: 5, preco: 1200 },
    { nome: "Caixao Top", descricao: "Caixao", qtde: 5, preco: 3200 },
    { nome: "Caixao Premium", descricao: "Caixao", qtde: 2, preco: 5200 },
    { nome: "Caixao Premium", descricao: "Caixao", qtde: 2, preco: 5200 },
    { nome: "Caixao Premium", descricao: "Caixao", qtde: 2, preco: 5200 },
    { nome: "Caixao Premium", descricao: "Caixao", qtde: 2, preco: 5200 },
    { nome: "Caixao Premium", descricao: "Caixao", qtde: 2, preco: 5200 },
    { nome: "Caixao Premium", descricao: "Caixao", qtde: 2, preco: 5200 },
    { nome: "Caixao Premium", descricao: "Caixao", qtde: 2, preco: 5200 },
    { nome: "Caixao Premium", descricao: "Caixao", qtde: 2, preco: 5200 },
]

// var listaDeProdutosDoBanco = fetch( )    // buscando direto da url da api

let listaHTML = ""
listaProdutos.forEach(produto => listaHTML = listaHTML + `<tr><td>1</td>
    <td>${produto.nome}</td>
    <td>${produto.descricao}</td>
    <td>${produto.qtde}</td>
    <td>R$ ${produto.preco}</td>
    <td>
        <button class="btn-edit">Editar</button>
        <button class="btn-delete">Excluir</button>
    </td></tr>` )

tabelaHTML.innerHTML = listaHTML