import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Address } from '../shared/models/address.model';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private url: string = `${environment.apiUrl}orders/userShippingAddress`;

  constructor(private http: HttpClient) { }

  createAddress(address: Address): Observable<Address> {
    return this.http.post<Address>(this.url, address);
  }

  getAddress(id: number): Observable<Address> {
    return this.http.get<Address>(`${this.url}/?addressId=${id}`);
  }

}
