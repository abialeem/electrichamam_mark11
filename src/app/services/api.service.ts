import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl;
  private newUrl = environment.phpBackUrl;
  constructor(private _http: HttpClient) { }

  getTypeRequest(url: string) {
    return this._http.get(`${this.newUrl}${url}`).pipe(
      map((res) => {
        return res;
      })
    );
  }
  postTypeRequest(url: string, payload: any) {
    return this._http.post(`${this.newUrl}${url}`, payload).pipe(
      map((res) => {
        return res;
      })
    );
  }
  putTypeRequest(url: string, payload: any) {
    return this._http.put(`${this.newUrl}${url}`, payload).pipe(
      map((res) => {
        return res;
      })
    );
  }
}
