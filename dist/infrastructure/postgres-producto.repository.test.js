import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { PostgresProductoRepository } from '#app/infrastructure/postgres-producto.repository.js';
import { pool } from '#shared/infrastructure/db/database.js';
describe('PostgresProductoRepository', () => {
    let repo;
    beforeEach(() => {
        repo = new PostgresProductoRepository();
    });
    it('debe mapear filas a Producto[] y convertir id a number', async () => {
        // Mock del cliente y pool
        const mockClient = {
            query: jest.fn(async () => ({ rows: [{ id: '2', clase: 'A', codigo: 'X1', nombre: 'Prod' }] })),
            release: jest.fn(),
        };
        // Spy en pool.connect
        const connectSpy = jest.spyOn(pool, 'connect').mockResolvedValue(mockClient);
        const productos = await repo.findAll();
        expect(connectSpy).toHaveBeenCalled();
        expect(mockClient.query).toHaveBeenCalled();
        expect(productos).toHaveLength(1);
        expect(productos[0].id).toBe(2);
        expect(productos[0].nombre).toBe('Prod');
        // Restaurar mock
        connectSpy.mockRestore();
    });
});
