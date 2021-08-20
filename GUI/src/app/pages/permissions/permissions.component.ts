// Angular
import { Component, OnInit } from '@angular/core';

// Project
import { PermissionsService } from 'src/app/shared/services/permissions.service';
import { Permissions } from './../../shared/models/permissions';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss'],
})
export class PermissionsComponent implements OnInit {
  permissions: Permissions | null;

  constructor(private permissionsService: PermissionsService) {
    this.permissions = null;
  }

  ngOnInit(): void {
    this.permissionsService
      .getPermissions$()
      .subscribe((permissions: Permissions) => {
        this.permissions = permissions;
      });
  }
}
