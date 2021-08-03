import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  toggle() { }
  isAuthenticated() {return true}
  seeAdministrationMenu() {return true}
  checkRoles() {return true}

}
