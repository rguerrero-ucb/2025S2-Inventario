import express, { Request, Response } from 'express';
import { Pool } from 'pg';

const app = express();

const pool = new Pool({
  user: 'ucb',
  host: 'localhost',
  database: 'ucb_almacen',
  password: 'Tarija2025',
  port: 5432,
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hola mundo...!');
});

app.get('/products', async (req: Request, res: Response) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM inventario.producto');
    client.release();
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching products' });
  }
});

app.listen(3000, () => {
  console.log('http://localhost:3000');
});
