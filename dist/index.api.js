import { GetProductsUseCase } from '#app/application/get-products.use-case.js';
import { PostgresProductoRepository } from '#app/infrastructure/postgres-producto.repository.js';
import { GetProductsController } from '#app/infrastructure/get-products-controller.js';
import express from 'express';
const app = express();
app.get('/', (req, res) => {
    res.send('Hola mundo...!');
});
app.get('/products', async (req, res) => {
    // 1. Inyección de dependencias (Adapters -> Ports)
    const productoRepository = new PostgresProductoRepository();
    const getProducts = new GetProductsUseCase(productoRepository);
    const controller = new GetProductsController(getProducts);
    // 2. Ejecutar el controlador
    await controller.getAllProducts(req, res);
});
app.listen(3000, () => {
    console.log('http://localhost:3000');
});
