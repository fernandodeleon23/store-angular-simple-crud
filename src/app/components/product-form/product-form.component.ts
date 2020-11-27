import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  public product: Product = { title: '', description: '', price: 0, imageUrl: '' };

  public edit: boolean;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _ProductS: ProductService
  ){}

  ngOnInit(): void {
    const params = this._activatedRoute.snapshot.params;
    
    if( params ){
      this._ProductS.getProduct( params.id ).subscribe( data => {
        this.edit = true;
        this.product = data['product'];
      });
    }
  }

  submitProduct(){
    this._ProductS.createProduct( this.product ).subscribe( data => {
      console.log(data);
      this._router.navigate(['/']);
    },err => console.log(err) );
  }

  updateProduct(){
    delete this.product.createdAt;
    return this._ProductS.updateProduct( this.product._id, this.product ).subscribe( data => {
      this._router.navigate(['/products']);
    }, err => console.log(err));
  }

}
