import { Component, OnInit } from '@angular/core';
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
  orders: any[] = [];
  distinctorders: any[] = [];
  shippingAddress:any = '';
  error = '';
  constructor(
    private _api: ApiService,
    private _auth: AuthService,
    private _product: ProductService
  ) {
    this.user = this._auth.getUser();
  }

  ngOnInit(): void {
    this._api.getTypeRequest(`orders/?userId=${this.user.id}`).subscribe(
      (res: any) => {
        // console.log(res);
        res.data.forEach((item) => {
          this._product
            .getSingleProduct(item.product_id)
            .subscribe((product) => {
              // console.log(product);
              this.orders.push({ ...product, ...item });
            });
        });
        // let uniqueProductsArray = Array.from(
        //   new Set(res.data.map((p) => p.product_id))
        // );
      },
      (err) => {
        this.error = err.error.message;
      }
    );

    this._api.getTypeRequest(`orders/userorders?userId=${this.user.id}`).subscribe(
      (res: any) => {
        console.log(res);
        // res.data.forEach((item) => {
        //   this._product
        //   .getShippingAddress(item.user_address_id)
        //     .subscribe((address) => {
        //       this.distinctorders['orders'].push({  ...item, ...address });
        //     });
        // });


          // this.distinctorders['orders'] = res.data;
      },
      (err) => {
        this.error = err.error.message;
      }
    );
      

  }


  // getShippingAddressDetails(addressId:any){
  //   return this._api.getTypeRequest(`orders/userShippingAddress?addressId=${addressId}`).subscribe(
  //     (res: any) => {
  //         this.shippingAddress = res.data;
  //     },
  //     (err) => {
  //       this.error = err.error.message;
  //     }
  //   );
  // }



}
