import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  server_url='http://localhost:3000'

  wishlistCount = new BehaviorSubject(0)

  constructor(private http:HttpClient) {
    if(sessionStorage.getItem("token")){
      this.getWishlistCountApi()
    }
   }

  getAllProductApi(){
    return this.http.get(`${this.server_url}/all-products`)
  }

  registerApi(user:any){
    return this.http.post(`${this.server_url}/register`,user)
  }

  loginApi(user:any){
    return this.http.post(`${this.server_url}/login`,user)
  }

  getAProductApi(id:any){
    return this.http.get(`${this.server_url}/get-product/${id}`)
  }

  addTokenToHeader(){
    let headers = new HttpHeaders()
    const token = sessionStorage.getItem("token")
    if(token){
      headers : headers.append('Authorization',`Bearer ${token}`)
    }
    return {headers}
  }

  addToWishlistApi(product:any){
    return this.http.post(`${this.server_url}/add-wishlist`,product,this.addTokenToHeader())
  }

  getFromWishlistApi(){
    return this.http.get(`${this.server_url}/getfrom-wishlist`,this.addTokenToHeader())
  }

  getWishlistCountApi(){
    this.getFromWishlistApi().subscribe((res:any)=>{
      this.wishlistCount.next(res.length)
    })
  }

  removeItemFromWishlistApi(id:any){
    return this.http.delete(`${this.server_url}/delete-wishlist/${id}`,this.addTokenToHeader())
  }

  addToCartApi(product:any){
    return this.http.post(`${this.server_url}/add/cart`,product,this.addTokenToHeader())
  }
}
