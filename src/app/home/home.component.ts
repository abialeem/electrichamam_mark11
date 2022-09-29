import { Component, OnInit,  HostListener, ViewEncapsulation } from '@angular/core';
import { Product, Products } from '../shared/models/product.model';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  categories: any[] = [
    {
      name: 'Electric Hamams',
    }
  ];
  loading = false;
  productPageCounter = 1;
  additionalLoading = false;

  constructor( private productService: ProductService,
    protected cartService: CartService) { }

    public screenWidth: any;
    public screenHeight: any;

    @HostListener('window:resize', ['$event'])
    onResize(event) {
      this.screenWidth = window.innerWidth;
      this.screenHeight = window.innerHeight;
    }

    ngOnInit(): void {
      this.screenWidth = window.innerWidth;
      this.screenHeight = window.innerHeight;
      this.loading = true;
      setTimeout(() => {
        this.productService.getAllProducts(9, this.productPageCounter).subscribe(
          (res: any) => {
            console.log(res);
            this.products = res;
            this.loading = false;
          },
          (err) => {
            console.log(err);
            this.loading = false;
          }
        );
      }, 500);
    }

    showMoreProducts(): void {
      this.additionalLoading = true;
      this.productPageCounter = this.productPageCounter + 1;
      setTimeout(() => {
        this.productService.getAllProducts(9, this.productPageCounter).subscribe(
          (res: any) => {
            console.log(res);
            this.products = [...this.products, ...res];
            this.additionalLoading = false;
          },
          (err) => {
            console.log(err);
            this.additionalLoading = false;
          }
        );
      }, 500);
    }

}
