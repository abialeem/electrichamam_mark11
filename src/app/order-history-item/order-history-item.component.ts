import { Component, Input, OnInit } from '@angular/core';
import { AddressService } from '../services/address.service';
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
  error = '';

  constructor( private _address: AddressService) { }

  ngOnInit(): void {
   
       this._address.getAddress( this.user_address_id).subscribe(
        (res: any) => {
          
             this.shippingAddress = res.data[0];
            
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