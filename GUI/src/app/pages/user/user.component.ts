import { User } from './../../shared/models/user';
import {HttpResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';


const ELEMENT_DATA: User[] = [
  {
    "estado": true,
    "nombre": "admin",
    "correo": "admin@gmail.com",
    "rol": "611ef3f943629a1ef3a33cd0",
    "uid": "611ba6d9b4155f163ef9c0d7"
},
{
    "estado": true,
    "nombre": "developer",
    "correo": "development@gmail.com",
    "rol": "611efd0343629a1ef3a33cd1",
    "uid": "611f021d43629a1ef3a33cd3"
},
{
    "estado": true,
    "nombre": "scrum_master",
    "correo": "scrum_master@gmail.com",
    "rol": "611efdb643629a1ef3a33cd2",
    "uid": "611f024243629a1ef3a33cd4"
},
{
    "estado": true,
    "nombre": "product_owner",
    "correo": "product_owner@gmail.com",
    "rol": "611ef3f943629a1ef3a33cd0",
    "uid": "611f096371716f38d2d7174a"
}
  
  
];


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  displayedColumns: string[] = ['estado', 'nombre', 'correo', 'rol', 'uid','acciones'];
  dataSource = ELEMENT_DATA;

  ngOnInit(): void {   
  }

  addData(): void {
    console.log("Agrega Datos")
  }

}
