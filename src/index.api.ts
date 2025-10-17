import { GetProductsUseCase } from '#app/application/get-products.use-case.js';
import { PostgresProductoRepository } from '#app/infrastructure/postgres-producto.repository.js';
import { GetProductsController } from '#app/infrastructure/get-products-controller.js';

import express, { Request, Response } from 'express';

const app = express();

app.get( '/', ( req: Request, res: Response ) => {
    res.send( 'Hola mundo...!' );
} );

app.get( '/products', async ( req: Request, res: Response ) => {
    // 1. Inyección de dependencias (Adapters -> Ports)
    const productoRepository = new PostgresProductoRepository();
    const getProducts = new GetProductsUseCase( productoRepository );
    const controller = new GetProductsController( getProducts );

    // 2. Ejecutar el controlador
    await controller.getAllProducts( req, res );
} );

app.listen( 3000, () => {
    console.log( 'http://localhost:3000' );
} );
