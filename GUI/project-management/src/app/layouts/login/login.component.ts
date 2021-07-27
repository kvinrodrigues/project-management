import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  authenticationError: boolean = false;
  username: string = "";
  password: string = "";
  loading = false;
  hide = true;

  constructor() {
  }

  ngOnInit(): void {}

  login(): any {
    this.loading = true;
    // TODO debe llamar al servicio

  }

  isLoginButtonEnabled() {
    return (this.username && this.password) && !this.loading;
  }

  getErrorMessage() {
    return "INVALID_LOGIN"; // TODO debe estar en constante
  }

  protected showMessage(message: string, detail: string, severity: string) {
    // this.messageService.add({severity: severity, summary: message, detail: detail});

  }

}
