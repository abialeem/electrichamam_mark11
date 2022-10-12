import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  currentUser: any;
  currentStep = 1;
  cartData: any;
  products: any;
  orderTotal:number;
  userAddresses:Array<any>;
  selectedAddressId:number;
  loading = false;
  successMessage = ''; 
  orderId;



  constructor(private _auth: AuthService, private _cart: CartService) {

    this._auth.user.subscribe((user) => {
      if (user) {
        this.currentUser = user;
        // this.billingAddress[0].value = user.fname;
        // this.billingAddress[1].value = user.email;
      }
    });

    this._cart.cartDataObs$.subscribe((cartData) => {
      this.cartData = cartData;
    });

   }

  ngOnInit(): void {
  
       console.log(this.cartData);
       
       setTimeout(() => {
        this._auth
          .getUserAddresses(this.currentUser.id)
          .subscribe(
            (res: any) => {
              console.log(res);
              this.userAddresses = res;
            },
            (err) => {
              console.log(err);
            }
          );
      }, 500);
  }

  submitCheckout() {
    this.loading = true;

    

    setTimeout(() => {
      this._cart
        .submitCheckout(this.currentUser.id, this.cartData, this.selectedAddressId)
        .subscribe(
          (res: any) => {
            console.log(res);
            this.loading = false;
            this.orderId = res.orderId;
            this.products = res.products;
            this.currentStep = 4;
            this._cart.clearCart();
          },
          (err) => {
            console.log(err);
            this.loading = false;
          }
        );
    }, 750);
  }

  getProgressPrecent() {
    return (this.currentStep / 4) * 100;
  }

  submitBilling(addressId:number): void {     //user address selected here and then next step started
    this.selectedAddressId = addressId;
    this.nextStep();
  }

  // canBillingSubmit(): boolean {
  //   return this.billingAddress.filter((field) => field.value.length > 0)
  //     .length !== 6
  //     ? true
  //     : false;
  // }


  getUserAddresses(){
    setTimeout(() => {
      this._auth
        .getUserAddresses(this.currentUser.user_id)
        .subscribe(
          (res: any) => {
            console.log(res);
            this.userAddresses = res.addresses;
          },
          (err) => {
            console.log(err);
          }
        );
    }, 500);
  }



  submitPayment(): void {
    this.nextStep();
  }

  // canPaymentSubmit(): boolean {
  //   return this.cardNumber && this.cardName && this.cardExpiry && this.cardCode
  //     ? true
  //     : false;
  // }

  nextStep(): void {
    this.currentStep += 1;
    localStorage.setItem('checkoutStep', this.currentStep.toString());
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep -= 1;
      localStorage.setItem('checkoutStep', this.currentStep.toString());
    }
  }



}
