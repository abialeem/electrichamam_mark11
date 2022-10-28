import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sellers, Seller } from '../shared/models/seller.model';
import { environment } from '../../environments/environment';
import { ApiService } from './api.service';
import { Products } from '../shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  private url = environment.apiUrl;
  private newUrl = environment.phpBackUrl;
  constructor(private http: HttpClient, private _api: ApiService) { }

  getAllSellers(): Observable<Sellers> {
    return this.http.get<Sellers>(this.newUrl + 'sellers/getAllSellers.php');
  }

  getSingleSeller(id: Number): Observable<any> {
    // console.log(id);
    return this._api.getTypeRequest('sellers/getSingleSeller.php?id=' + id);
  }


  getAllProductsBySeller(sellerid: Number): Observable<Products> {
    return this.http.get<Products>(this.newUrl + 'sellers/getSingleSellerProducts.php?id=' + sellerid);
    // return this._api.getTypeRequest('sellers/seller_products' + sellerid);
  }

  
}
 