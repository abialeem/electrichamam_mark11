import { Component, HostListener, OnInit } from '@angular/core';
import { Seller, Sellers } from '../../shared/models/seller.model';
import { SellerService } from '../../services/seller.service';
@Component({
  selector: 'app-sellers',
  templateUrl: './sellers.component.html',
  styleUrls: ['./sellers.component.css']
})
export class SellersComponent implements OnInit {
  brands: Seller[] = [];

  sellerloading = false;
  productPageCounter = 1;
  additionalLoading = false;
  constructor(protected sellerService: SellerService) { }

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
    this.sellerloading = true;
    setTimeout(() => {
      this.sellerService.getAllSellers(9, this.productPageCounter).subscribe(
        (res: any) => {
          console.log(res);
          this.brands = res;
          this.sellerloading = false;
        },
        (err) => {
          console.log(err);
          this.sellerloading = false;
        }
      );
    }, 500);
  }

}
