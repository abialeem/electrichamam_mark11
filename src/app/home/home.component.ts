import { Component, OnInit,  HostListener, ViewEncapsulation } from '@angular/core';
import { Product, Products } from '../shared/models/product.model';
import { Seller, Sellers } from '../shared/models/seller.model';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { SellerService } from '../services/seller.service';
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
  brands: Seller[] = [];
  loading = false;
  sellerloading = false;
  productPageCounter = 1;
  additionalLoading = false;

  constructor( private productService: ProductService,
    protected cartService: CartService,protected sellerService: SellerService) { }

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
      this.sellerloading = true;
      setTimeout(() => {
        this.productService.getAllProducts().subscribe(
          (res: any) => {
            //  console.log(res);
            this.products = res['data'];
            this.loading = false;
          },
          (err) => {
            console.log(err);
            this.loading = false;
          }
        );
      }, 500);
      setTimeout(() => {
        this.sellerService.getAllSellers().subscribe(
          (res: any) => {
            // console.log(res);
            this.brands = res['data'];
            this.sellerloading = false;
          },
          (err) => {
            console.log(err);
            this.sellerloading = false;
          }
        );
      }, 500);
    }

    showMoreProducts(): void {
      this.additionalLoading = true;
      this.productPageCounter = this.productPageCounter + 1;
      setTimeout(() => {
        this.productService.getAllProducts().subscribe(
          (res: any) => {
            // console.log(res);
            this.products = [...this.products, ...res['data']];
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
