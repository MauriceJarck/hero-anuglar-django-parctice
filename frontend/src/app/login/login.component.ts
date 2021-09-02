import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = "";
  password: string = "";
  submitted = false;

  constructor(private router: Router,
              ) { }

  ngOnInit() {}
  
  onSubmit() {

    this.submitted = true;

    if (this.password == "123"){
      this.router.navigateByUrl('/heroes')
      console.log("routed")
    }
    else{
      this.router.navigateByUrl('/login')
      window.location.reload();

    }
 }
 login(){
   console.log("login")
 }
}
