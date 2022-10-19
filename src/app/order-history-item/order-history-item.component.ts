import { Component, Input, OnInit } from '@angular/core';
import { AddressService } from '../services/address.service';
import { ApiService } from '../services/api.service';
import { ProductService } from '../services/product.service';
import { Address } from '../shared/models/address.model';

@Component({
  selector: 'app-order-history-item',
  templateUrl: './order-history-item.component.html',
  styleUrls: ['./order-history-item.component.css']
})
export class OrderHistoryItemComponent implements OnInit {
  @Input()
  orderlistindex!: number;

  @Input()
  orderId!: number;

  @Input()
  user_id!: number;

  @Input()
  placed_on!: string;

  @Input()
  total_amount!: number;

  @Input()
  user_address_id!: number;

  @Input()
  status!: string;


  shippingAddress:Address;
  orderDetails:any[]=[];

  error = '';

  constructor( private _address: AddressService,private _product: ProductService,private _api: ApiService,) { }

  ngOnInit(): void {
              //get shipping address
       this._address.getAddress( this.user_address_id).subscribe(
        (res: any) => {
          
             this.shippingAddress = res.data[0];
            // console.log(res.data[0]);
        },
        (err) => {
          this.error = err.error.message;
        }
      );

          //get order details and product details 
      this._api.getTypeRequest(`orders/single/?orderId=${this.orderId}&userId=${this.user_id}`).subscribe(
        (res: any) => {
            
          res.data.forEach((item) => {
            this._product
              .getSingleProduct(item.product_id)
              .subscribe((product) => {
                // console.log(product);
                this.orderDetails.push({ ...product, ...item });
                
              });
          });


          // console.log(this.orderDetails);
          // let uniqueProductsArray = Array.from(
          //   new Set(res.data.map((p) => p.product_id))
          // );

        },
        (err) => {
          this.error = err.error.message;
        }
      );







    
  }
 
}


/*
            old version of get shipping address details  function

             getShippingAddressDetails(addressId:any){
    this._api.getTypeRequest(`orders/userShippingAddress?addressId=${addressId}`).subscribe(
      (res: any) => {
          this.shippingAddress = res.data;
      },
      (err) => {
        this.error = err.error.message;
      }
    );
  }

*/