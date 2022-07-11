import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { first, mergeMap, Observable } from 'rxjs';
import { UserFacade } from 'src/app/state/user/user.facade';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService {
  constructor(private userFacade: UserFacade) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.userFacade.token$.pipe(
      first(),
      mergeMap((token) => {
        const authReq = !!token
          ? request.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
          : request;
        return next.handle(authReq);
      })
    );
  }
}
