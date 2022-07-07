import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { UserFacade } from 'src/app/home';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService {
  constructor(private facade: UserFacade) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let idToken = '';
    this.facade.token$.subscribe((value) => (idToken = value));

    if (idToken) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + idToken),
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
