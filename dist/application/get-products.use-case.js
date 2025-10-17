export class GetProductsUseCase {
    productoRepository;
    constructor(productoRepository) {
        this.productoRepository = productoRepository;
    }
    async execute() {
        return this.productoRepository.findAll();
    }
}
