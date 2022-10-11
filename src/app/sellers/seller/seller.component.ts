import { Component, OnInit,  HostListener} from '@angular/core';
import { Seller } from '../../shared/models/seller.model';
import { SellerService } from '../../services/seller.service';
import { Product } from 'src/app/shared/models/product.model';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit {
  brand_id:number;
  brand: Seller;
  products:Product[]=[];
  brandloading = false;
  productsloading = false;
  productPageCounter = 1;

  constructor(protected sellerService: SellerService, private _route: ActivatedRoute,private productService: ProductService,
    protected cartService: CartService,) { }


  public screenWidth: any;
  public screenHeight: any;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }


  ngOnInit(): void {
    this.brand_id = parseInt(this._route.snapshot.paramMap.get('id'));
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.productsloading = true;
    this.brandloading = true;
    
    //get brand data ....of id given in the url
    setTimeout(() => {
      this.sellerService.getSingleSeller(this.brand_id).subscribe(
        (res: any) => {
          console.log(res);
          this.brand = res;
          this.brandloading = false;
        },
        (err) => {
          console.log(err);
          this.brandloading = false;
        }
      );
    }, 500);

    setTimeout(() => {
      this.sellerService.getAllProductsBySeller(this.brand_id).subscribe(
        (res: any) => {
          console.log(res);
          this.products = res;
          this.productsloading = false;
        },
        (err) => {
          console.log(err);
          this.productsloading = false;
        }
      );
    }, 500);

  


  }
 
}
