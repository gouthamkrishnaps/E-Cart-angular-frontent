import { Component, OnInit } from '@angular/core';
import { APIService } from '../services/api.service';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css']
})
export class AllProductComponent implements OnInit{

allproduct:any=[]

    constructor(private api:APIService){}

    ngOnInit(): void {
        this.api.getAllProductApi().subscribe({
          next:(res:any)=>{
            this.allproduct=res
            console.log(this.allproduct);
            
          },
          error:(err:any)=>{
            console.log(err);
            
          }
        })
    }

    addToWishlist(product:any){
      if(sessionStorage.getItem("token")){
        this.api.addToWishlistApi(product).subscribe({
          next:(res:any)=>{
            console.log(res);
            this.api.getWishlistCountApi()
            alert('Product added to wishlist Succesfully')
            
          },
          error:(err:any)=>{
            alert(`Oops error occured ${err}`)
          }
        })
      }
      else{
        alert("Please login")
      }
    }

    addToCart(product:any){
      if(sessionStorage.getItem("token")){
        Object.assign(product,{quantity:1})
        this.api.addToCartApi(product).subscribe({
          next:(res:any)=>{
            console.log(res);
            this.api.getWishlistCountApi()
            alert('Product added to cart Succesfully')
            
          },
          error:(err:any)=>{
            console.log(err);
            
            alert(`Oops error occured ${err}`)
          }
        })
      }
      else{
        alert("Please login")
      }
    }
}
