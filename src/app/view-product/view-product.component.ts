import { Component, OnInit } from '@angular/core';
import { APIService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  product:any={}

  constructor(private api:APIService ,private route:ActivatedRoute){}

  ngOnInit(): void {
      this.route.params.subscribe((res:any)=>{
        const id = res.id
        console.log(id);
        this.getProduct(id)
      })

      
  }

  getProduct(id:any) {
      this.api.getAProductApi(id).subscribe({
        next:(res:any)=>{
          this.product=res[0]
          console.log(this.product);
          
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
}
