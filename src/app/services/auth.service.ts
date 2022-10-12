import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { TokenStorageService } from './token-storage.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<any>;
  public user: Observable<any>;
  private url = environment.apiUrl;

  constructor(private _api: ApiService, private _token: TokenStorageService,private http: HttpClient) {
    this.userSubject = new BehaviorSubject<any>(this._token.getUser());
    this.user = this.userSubject.asObservable();
  }

  getUser() {
    console.log(this.userSubject);
    console.log(this.userSubject.value);
    return this.userSubject.value;
  }

  login(credentials: any): Observable<any> {
    return this._api
      .postTypeRequest('auth/login', {
        email: credentials.email,
        password: credentials.password,
      })
      .pipe(
        map((res: any) => {
          let user = {
            email: credentials.email,
            token: res.token,
          };
          this._token.setToken(res.token);
          this._token.setUser(res.data[0]);
          console.log(res);
          this.userSubject.next(user);
          return user;
        })
      );
  }
                //sign up or register function here
  register(user: any): Observable<any> {
    return this._api.postTypeRequest('auth/register', {
      fullName: user.fullName,
      email: user.email,
      password: user.password,
    });
  }

            //get user details functions starts here

    //get user addresses functions starts here
    getUserAddresses(userid: Number): Observable<any> {

      return this.http.get<any>(this.url + 'users/user_addresses/' + userid);
     
    }
    //get user addresses functions ends here


            //get user details functions ends here


  logout() {
    this._token.clearStorage();
    this.userSubject.next(null);
  }
}
