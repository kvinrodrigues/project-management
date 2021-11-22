import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {AuthenticationService} from "../authentication.service";

@Injectable()
export class AuthExpiredInterceptor implements HttpInterceptor {
    constructor() {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            tap(
                (event: HttpEvent<any>) => {
                },
                (err: any) => {
                    if (err instanceof HttpErrorResponse) {
                        if (err.status === 401) {
                            AuthenticationService.logout();
                        }
                    }
                }
            )
        );
    }
}
