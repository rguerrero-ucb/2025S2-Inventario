import { jest, describe, expect } from '@jest/globals';

import { Producto } from '#app/domain/producto.entity.js';
import { ProductoRepository } from '#app/domain/producto.repository.js';
import { GetProductsUseCase } from '#app/application/get-products.use-case.js';

describe('GetProductsUseCase', () => {
  let getProductsUseCase: GetProductsUseCase;
  let mockProductoRepository: jest.Mocked<ProductoRepository>;

  beforeEach(() => {
    // Creamos un mock del repositorio con un método `findAll` simulado por Jest
    mockProductoRepository = {
      findAll: jest.fn(),
    };

    // Instanciamos el caso de uso con el repositorio simulado
    getProductsUseCase = new GetProductsUseCase(mockProductoRepository);
  });

  it('debe retornar un array de productos', async () => {
    // 1. Arrange: Preparación de datos de prueba
    const mockProducts: Producto[] = [{ id: 1, nombre: 'Laptop', clase: 'Computadora', codigo: '12345' }];
    mockProductoRepository.findAll.mockResolvedValue(mockProducts);

    // 2. Act: Ejecutamos el método a probar
    const result = await getProductsUseCase.execute();

    // 3. Assert: Verificación de resultados
    expect(result).toEqual(mockProducts);
    expect(mockProductoRepository.findAll).toHaveBeenCalledTimes(1);
  });
});