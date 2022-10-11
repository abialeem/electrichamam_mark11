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
  constructor(private http: HttpClient, private _api: ApiService) { }

  getAllSellers(limitOfResults = 10, page: number): Observable<Sellers> {
    return this.http.get<Sellers>(this.url + 'sellers', { 
      params: {
        limit: limitOfResults.toString(),
        page: page,
      },
    });
  }

  getSingleSeller(id: Number): Observable<any> {
    // console.log(id);
    return this._api.getTypeRequest('sellers/' + id);
  }


  getAllProductsBySeller(sellerid: Number): Observable<Products> {
    return this.http.get<Products>(this.url + 'sellers/seller_products/' + sellerid);
    // return this._api.getTypeRequest('sellers/seller_products' + sellerid);
  }

  
}
 