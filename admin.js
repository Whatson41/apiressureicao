const express = require('express');
const { Pool } = require('pg')
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

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
