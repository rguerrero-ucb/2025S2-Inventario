export class GetProductsController {
  constructor( private getProducts: any ) {}

  async getAllProducts( req: any, res: any ) {
    try {

      const productos = await this.getProducts.execute();
      res.json( productos );
    } catch ( error ) {
      res.status( 500 ).json( { message: 'Error fetching products' } );
    }
  }
}