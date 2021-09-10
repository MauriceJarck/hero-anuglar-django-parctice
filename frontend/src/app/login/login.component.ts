import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { UserModel } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() user?: UserModel;
  username: string = "";
  password: string = "";
  email: string = "";
  token: string = "";
  submitted: boolean = false;
  authenticated: boolean = true;

  constructor(
    private router: Router,
    private accountService: AccountService
    ) { }

  ngOnInit() { 
  }
  
  onSubmit() {

    this.accountService.getTokensFromBackend(this.username, this.password).subscribe(res => this.login(res))
    this.submitted = true
  }
 
  login(res: any): void{
    var accessToken: string = res['access']
    console.log(this.accountService.getTokenExpirationDate(accessToken))
    // console.log(accessToken)
    this.accountService.getRefreshedTokensFromBackend().subscribe()

    if (accessToken){
      this.router.navigateByUrl('/heroes')
    }
  }
}
