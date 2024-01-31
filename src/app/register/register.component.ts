import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { APIService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private fb:FormBuilder ,private api:APIService ,private router:Router){}

  registerform = this.fb.group({
    username:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })

  register(){
    if(this.registerform.valid){
      const username = this.registerform.value.username
      const email = this.registerform.value.email
      const password = this.registerform.value.password

      const user = {username , email , password}
            this.api.registerApi(user).subscribe({
              next:(res:any)=>{
                console.log(res);
                
                alert('register success')
                this.router.navigateByUrl('user/login')
              },
              error:(err:any)=>{
                console.log(err);
                alert(err.error)
              }
            })
    }else{
      alert('invalid form')
    }
  }

}
