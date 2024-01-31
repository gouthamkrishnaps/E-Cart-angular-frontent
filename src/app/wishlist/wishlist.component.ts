import { Component, OnInit } from '@angular/core';
import { APIService } from '../services/api.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit{

  allProducts:any=[]

  constructor(private api:APIService){}

  ngOnInit(): void {
    this.getWishlist()
  }

  getWishlist(){
    this.api.getFromWishlistApi().subscribe({
      next:(res:any)=>{
        this.allProducts=res
        console.log(this.allProducts);
        
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

  removeIten(id:any){
    this.api.removeItemFromWishlistApi(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.api.getWishlistCountApi()
        alert('Product removed Succesfully')
        this.getWishlist()
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }
}
