import { Component, OnInit } from '@angular/core';
import { AddressService } from '../services/address.service';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  user: any;
  distinctorders: any[] = [];
  error = '';
  constructor(
    private _api: ApiService,
    private _auth: AuthService,
    private _product: ProductService,
    private _address: AddressService
  ) {
    this.user = this._auth.getUser();
  }

  ngOnInit(): void {
   
    this._api.getTypeRequest(`orders/userorders?userId=${this.user.id}`).subscribe(
      (res: any) => {

        //        older getting shipping address for each order starts here ...........it kept giving new rows rather than adding

        // res.data.forEach((item) => {
        //   this._address
        //   .getAddress(item.user_address_id)
        //     .subscribe((address) => {

        //       this.distinctorders['orders'].push({ ...item, ...address });
              
        //     });
        // });

        //        order getting shipping address for each order item ends here

          this.distinctorders['orders'] = res.data;
      },
      (err) => {
        this.error = err.error.message;
      }
    );
      

  }


 



 


}
