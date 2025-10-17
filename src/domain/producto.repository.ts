import { Producto } from '#app/domain/producto.entity.js';

export interface ProductoRepository {
  findAll(): Promise<Producto[]>;
}