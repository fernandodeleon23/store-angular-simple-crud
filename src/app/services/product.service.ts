import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public apiUrl: string = 'http://localhost:3000';

  constructor( private _http: HttpClient ) { }

  getProducts(): Observable<Product[]>{
    return this._http.get<Product[]>( this.apiUrl+'/product' );
  }

  getProduct( id:string ): Observable<Product>{
    return this._http.get<Product>( this.apiUrl+'/product/'+id );
  }

  createProduct( product: Product ): Observable<Product>{
    return this._http.post<Product>( this.apiUrl+'/product/create', product );
  }

  deleteProduct( id: string ): Observable<Product>{
    return this._http.delete<Product>( this.apiUrl+'/product/delete/'+id );
  }

  updateProduct( id: string, product: Product ): Observable<Product>{
    return this._http.put<Product>( this.apiUrl+'/product/update/'+id, product );
  }
}
