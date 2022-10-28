import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { map } from 'rxjs/operators';

// import Swiper core and required components
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  Zoom,
  Autoplay,
  Thumbs,
  Controller,
} from 'swiper';
import { CartService } from '../services/cart.service';
import { Product } from '../shared/models/product.model';

// install Swiper components
SwiperCore.use([
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  Zoom,
  Autoplay,
  Thumbs,
  Controller,
]);

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  id: number;
  product: Product;
  quantity: number;
  incart:boolean;
  showcaseImages: any[] = [];
  loading = false;

  activeImage =  '';

 

  constructor(
    private _route: ActivatedRoute,
    private _product: ProductService,
    private _cart: CartService 
  ) {}



 ngOnInit(): void {
    this.loading = true;
    this._route.paramMap
      .pipe(
        map((param: any) => {
          return param.params.id;
        })
      )
      .subscribe((productId) => {
        // returns string so convert it to number
        this.id = parseInt(productId);
        this._product.getSingleProduct(productId).subscribe((product) => {
          console.log(product);
          this.product = product['data'][0];
          if (product.quantity === 0) this.quantity = 0;
          else this.quantity = 1;
 
          if (product.images) {
            this.showcaseImages = product.images.split(';');
          }
          this.loading = false;
          this.activeImage = this.product.image;
        });
      });

      

      if(this._cart.isProductInCart(this.id)){
        this.incart = this._cart.isProductInCart(this.id);

        // this.quantity = this._cart.cartData   ---to be done later
      }

     
  }

  changeImage(image: any){
    this.activeImage = image ;
  }

  addToCart(): void {
    this._cart.addProduct({
      id: this.id,
      price: this.product.price,
      quantity: this.quantity,
      image: this.product.image,
      title: this.product.title,
      maxQuantity: this.product.quantity,
      description: this.product.description,
      category: 'Electric Hamams',
      seller_id: this.product.seller_id
    });
  }

}
