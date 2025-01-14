const express = require('express');
const { Pool } = require('pg')
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Configuração do banco de dados PostgreSQL
// const pool = new Pool({

//bd_funeraria_user
//ZZM8wFsEESt0UnNVhcSpWV6ydLVMgKr2
//dpg-cu2lparqf0us73bp3oig-a.oregon-postgres.render.com
//bd_funeraria


//     user: 'postgres',
//     host: 'viaduct.proxy.rlwy.net',
//     database: 'railway',
//     password: '123mudar',
//     port: 5432,
// });

const pool = new Pool({
    user: 'bd_funeraria_user',
    host: 'dpg-cu2lparqf0us73bp3oig-a.oregon-postgres.render.com',
    database: 'bd_funeraria',
    password: 'ZZM8wFsEESt0UnNVhcSpWV6ydLVMgKr2',
    port: 5432,
});

console.log(pool)

pool.connect()


app.use(bodyParser.json());

app.get("/", (req,res)=>{
    res.send("a")
})

// Rota para mostrar todos os itens
app.get('/itens', async (req, res) => {
    console.log(req)
    try {
      //  const result = await pool.query('SELECT * FROM itens');
        const result = await pool.query('SELECT * FROM tab_produtos');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Rota para inserir um novo item
//nome,descrição,quantidade e preço
app.post('/itens', async (req, res) => {
    console.log(req)
    const { nome, descricao } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO tab_produtos (nome, descricao,quantidade,preco) VALUES ($1, $2, $3, $4) RETURNING *',
            [nome, descricao]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Rota para deletar um item
app.delete('/itens/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM tab_produtos WHERE id = $1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Item não encontrado' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Rota para selecionar todos os usuários
app.get('/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tab_cliente');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar dados dos usuários' });
    }
});

// Rota para adicionar um novo usuário
app.post('/users', async (req, res) => {
    const { email, senha, cpf, nome } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO users (email, senha, cpf, nome) VALUES ($1, $2, $3, $4) RETURNING *',
            [email, senha, cpf, nome]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao inserir novo usuário' });
    }
});

// Rota para deletar um usuário pelo ID
app.delete('/users/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await pool.query('DELETE FROM users WHERE id = $1', [id]);
        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao deletar usuário' });
    }
});

async function inserirEstoque(produto, quantidade) {
    try {
        const sql = 'INSERT INTO tab_estoque (produto_id,quantidade_produto) VALUES ($1, $2)'
        const values = [produto, quantidade]
        await client.query(sql, values);
        await client.end()
        console.log('Dados foram inseridos')
    } catch (err) {
        console.error('Não foi inserido')
    }
}

async function inserirDocumentacao(cliente, plano, corpo, carro, servicos, servicos_plus) {
    try {
        const sql = 'INSERT INTO tab_documentacao (cliente_id,plano_funerario,corpo_id,carro_id,servicos_id,servicos_complemetares_id) VALUES ($1, $2, $3, $4, $5, $6)'
        const values = [cliente, plano, corpo, carro, servicos, servicos_plus]
        await client.query(sql, values);
        await client.end()
        console.log('Dados foram inseridos')
    } catch (err) {
        console.error('Não foi inserido')
    }
}

async function verificarEstoque(produto, quantidade) {
    try {
        const sql = 'SELECT * FROM tab_estoque Where produto_id,quantidade_produto = $1, $2'
        const values = [produto, quantidade]
        const result = await client.query(sql, values);
        await client.query(sql, values);
        await client.end()
        return result.rows.length > 0;
    } catch (err) {
        console.error('Erro ao verificar produto', err);
        return false;
    }
}

async function verificarDocumentacao(cliente, plano, corpo, carro, servicos, servicos_plus) {
    try {
        const sql = 'SELECT * FROM tab_documentacao Where cliente_id,plano_funerario,corpo_id,carro_id,servicos_id,servicos_complemetares_id = $1, $2, $3, $4, $5, $6'
        const values = [cliente, plano, corpo, carro, servicos, servicos_plus]
        const result = await client.query(sql, values);
        await client.query(sql, values);
        await client.end()
        return result.rows.length > 0;
    } catch (err) {
        console.error('Erro ao verificar produto', err);
        return false;
    }
}

//async function fetchProdutos() {
  //  try {
    //    const response = await fetch('http://localhost:3000/produtos');
        //const produtos = await response.json();
      //  renderTable(produtos);
    //} catch (err) {
     //   console.error('Erro ao carregar produtos:', err);
    //}
//}

function renderTable(produtos) {
    const tbody = document.querySelector('#tab_estoque tbody');
    tbody.innerHTML = '';
    produtos.forEach(produto => {
        const row = `
                <tr>
                    <td>${produto.id}</td>
                    <td>${produto.produto}</td>
                    <td>${produto.categoria}</td>
                    <td>${produto.quantidade}</td>
                    <td>R$ ${produto.preco}</td>
                    <td>
                        <button class="btn-edit">Editar</button>
                        <button class="btn-delete">Excluir</button>
                    </td>
                </tr>
            `;
        tbody.insertAdjacentHTML('beforeend', row);
    });
}

// window.onload = fetchProdutos;

async function enviarCadastro(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Captura os dados do formulário
    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    // Monta o objeto para enviar à API
    const dados = {
        nome,
        cpf,
        email,
        senha
    };

    try {
        // Faz a requisição POST para a API
        const resposta = await fetch('https://localhost:3000/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });

        if (resposta.ok) {
            const resultado = await resposta.json();
            alert('Cadastro realizado com sucesso!');
            // Redireciona ou executa outra ação
        } else {
            alert('Erro ao cadastrar. Verifique os dados e tente novamente.');
        }
    } catch (erro) {
        console.error('Erro na requisição:', erro);
        alert('Erro ao conectar com o servidor. Tente novamente mais tarde.');
    }
}

console.log('foi')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`);
});
