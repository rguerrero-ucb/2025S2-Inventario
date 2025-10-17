import { Producto } from '#app/domain/producto.entity.js';
import { ProductoRepository } from '#app/domain/producto.repository.js';

export class GetProductsUseCase {
  constructor(
    private readonly productoRepository: ProductoRepository
  ) {}

  async execute(): Promise<Producto[]> {

    return this.productoRepository.findAll();
  }
}