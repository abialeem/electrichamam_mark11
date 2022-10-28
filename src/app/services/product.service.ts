import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products, Product } from '../shared/models/product.model';
import { environment } from '../../environments/environment';
import { ApiService } from './api.service';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = environment.apiUrl;
  private newUrl = environment.phpBackUrl;
 
  constructor(private http: HttpClient, private _api: ApiService) { }

  getAllProducts(): Observable<Products> {
    return this.http.get<Products>(this.newUrl + 'products/getAllProducts.php');
  }

  getSingleProduct(id: Number): Observable<any> {
    // console.log(id);
    return this._api.getTypeRequest('products/getSingleProduct.php?id=' + id);
  }

  // getShippingAddress(id: Number): Observable<any> {
  //   // console.log(id);
  //   return this._api.getTypeRequest('orders/userShippingAddress?addressId=' + id);
  // }
 


}