import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { UserModel } from '../user';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() user?: UserModel;
  username: string = ""
  password: string = ""
  email: string = ""
  token: string = ""
  authfail: any
  constructor(
    private accountService: AccountService,
    private router: Router,
    ) { }

  ngOnInit() {}
  
  onSubmit() {
    this.accountService.getTokensFromBackend(this.username, this.password).subscribe(
      () => this.router.navigateByUrl('/heroes'), 
      err => {
        this.authfail = true
      })
  }
}
