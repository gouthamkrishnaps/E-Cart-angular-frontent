import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from '../services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loginUserName:string=""
  wishlistCount:Number=0

  constructor(private router:Router , private api:APIService){}


  ngOnInit(): void {
    if(sessionStorage.getItem("username")){
      this.loginUserName = sessionStorage.getItem
      ("username") || ""
      this.api.wishlistCount.subscribe((res:any)=>{
        this.wishlistCount=res
      })
    }
    else{
      this.loginUserName = ""
    }
  }



}
