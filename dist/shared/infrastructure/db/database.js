import { Pool } from 'pg';
export const pool = new Pool({
    user: 'ucb',
    host: 'localhost',
    database: 'ucb_almacen',
    password: 'Tarija2025',
    port: 5432,
});
