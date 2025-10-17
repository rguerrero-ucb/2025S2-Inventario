export class GetProductsController {
    getProducts;
    constructor(getProducts) {
        this.getProducts = getProducts;
    }
    async getAllProducts(req, res) {
        try {
            const productos = await this.getProducts.execute();
            res.json(productos);
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching products' });
        }
    }
}
