import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  public products: Product[];

  constructor( private _productS: ProductService ) { }

  ngOnInit(): void {
    this.getTheProducts();
  }

  getTheProducts(){
    this._productS.getProducts().subscribe( data => {
      this.products = data['product'];
    }, err => console.log(err) );
  }

  delete(id: string){
    this._productS.deleteProduct(id).subscribe(
      res => {
        this.getTheProducts();
      },
      err => {
        console.log(err)
      }
    );
  }

}
