import { GetProductsUseCase } from '#app/application/get-products.use-case.js';
import { pool } from '#app/shared/infrastructure/db/database.js';
import { PostgresProductoRepository } from '#app/infrastructure/postgres-producto.repository.js';

async function main() {
  // 1. Inyección de dependencias (Adapters -> Ports)
  const productoRepository = new PostgresProductoRepository();
  const getProducts = new GetProductsUseCase( productoRepository );

  try {
    // 2. Ejecutar el caso de uso
    const productos = await getProducts.execute();

    console.log( 'Productos encontrados:', productos );
  } catch ( error ) {
    console.error( 'Ocurrió un error en la aplicación:', error );
  } finally {
    // 3. Cerrar recursos
    await pool.end();
    console.log( 'Conexión a la base de datos cerrada.' );
  }
}

main();
