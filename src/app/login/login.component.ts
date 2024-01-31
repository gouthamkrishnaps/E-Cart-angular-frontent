import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { APIService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private fb:FormBuilder ,private api:APIService ,private router:Router){}

  loginForm = this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })

  login(){
   
    if(this.loginForm.valid){
      const email = this.loginForm.value.email
      const password = this.loginForm.value.password
      const user={email,password}
       this.api.loginApi(user).subscribe({
        next:(res:any)=>{
          console.log(res);
          alert('login successfull')

          sessionStorage.setItem("username",res.existingUser.username)
          sessionStorage.setItem("token",res.token)

          this.router.navigateByUrl('')
        },
        error:(err:any)=>{
          alert(err.error);
        }
       })
    }
    else{
      this.loginForm.reset()
      alert('invalid form')
    }
  }

}
