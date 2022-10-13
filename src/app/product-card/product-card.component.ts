import { Component, OnInit, Input } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input()
  title!: string;
  @Input()
  seller_id!: string;
  @Input()
  image!: string;
  @Input()
  description!: string;
  @Input()
  category!: string;
  @Input()
  quantity!: number;
  @Input()
  price!: number;
  @Input()
  id!: number;
  @Input() onAdd: any;


  incart:boolean;

  constructor( private _cart: CartService ) { }

  ngOnInit(): void {

    if(this._cart.isProductInCart(this.id)){
      this.incart = this._cart.isProductInCart(this.id);
  
      // this.quantity = this._cart.cartData   ---to be done later
    }

    
  }

  

} 
