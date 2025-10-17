import { ProductoRepository } from '#app/domain/producto.repository.js';
import { Producto } from '#app/domain/producto.entity.js';
import { pool } from '#shared/infrastructure/db/database.js';

export class PostgresProductoRepository implements ProductoRepository {
  /**
   * Retorna un arreglo de `Producto` mapeando las filas de la base de datos.
   * Asegura que `id` sea un number.
   *
   * Devuelve: Promise<Producto[]>
   */
  async findAll (): Promise<Producto[]> {
    const client = await pool.connect();
    try {
      const result = await client.query(
        'SELECT id, clase, codigo, nombre FROM inventario.producto'
      );

      // Mapear filas a la forma esperada por la interfaz Producto
      const productos: Producto[] = result.rows.map((row: any) => ({
        id: Number(row.id),
        clase: row.clase,
        codigo: row.codigo,
        nombre: row.nombre,
      }));

      return productos;
    } catch ( error ) {
      console.error( 'Error fetching products from DB', error );
      throw error;
    } finally {
      client.release();
    }
  }
}