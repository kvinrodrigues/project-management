// Angular
import { Component, OnInit } from '@angular/core';
import {HttpResponse} from '@angular/common/http';

// Project
import { Permissions } from './../../shared/models/permissions';

const ELEMENT_DATA: Permissions[] = [
  {
    "nombre_permiso": "ADMIN_ROLE",
    "descripcion": "Permiso de administrador",
    "uid": "6115de030b622b45c8537e4b"
  },
  {
    "nombre_permiso": "PERMISO BÁSICO",
    "descripcion": "Permiso de usuario básico",
    "uid": "6115f88410c4c0459cfb286e"
  },
  {
    "nombre_permiso": "CONSULTAR_USUARIO",
    "descripcion": "Permisos para consultar usuario",
    "uid": "611ee9d843629a1ef3a33cca"
  },
  {
    "nombre_permiso": "MODIFICAR_USUARIO",
    "descripcion": "Permisos para modificar usuario",
    "uid": "611ee9fb43629a1ef3a33ccb"
  },
  {
    "nombre_permiso": "CONSULTAR_ROL",
    "descripcion": "Permisos para consultar rol",
    "uid": "611eea2743629a1ef3a33ccc"
  }
  
];


@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss'],
})
export class PermissionsComponent implements OnInit {
  displayedColumns: string[] = ['nombre_permiso', 'descripcion', 'uid', 'acciones'];
  dataSource = ELEMENT_DATA;

  ngOnInit(): void {
  }

  addData(): void {
    console.log("Agrega Datos")
  }
}
