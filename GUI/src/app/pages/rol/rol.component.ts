import {Rol} from './../../shared/models/rol';
import {Component, OnInit} from '@angular/core';

const ELEMENT_DATA: Rol[] = [
    {
        "estado": true,
        "_id": "611ef3f943629a1ef3a33cd0",
        "rol": "PRODUCT_OWNER",
        "descripcion": "Rol del dueño de proyecto",
    },
    {
        "estado": true,
        "_id": "611efd0343629a1ef3a33cd1",
        "rol": "DEVELOPMENT",
        "descripcion": "Rol del equipo de desarrollo",
    },
    {
        "estado": true,
        "_id": "611efdb643629a1ef3a33cd2",
        "rol": "SCRUM_MASTER",
        "descripcion": "Rol del scrum master",
    }

];

@Component({
    selector: 'app-rol',
    templateUrl: './rol.component.html',
    styleUrls: ['./rol.component.scss']
})
export class RolComponent implements OnInit {
    displayedColumns: string[] = ['_id', 'rol', 'descripcion', 'estado', 'acciones'];
    dataSource = ELEMENT_DATA;

    ngOnInit(): void {
    }

    addData(): void {
        console.log("Agrega Datos")
    }
}
