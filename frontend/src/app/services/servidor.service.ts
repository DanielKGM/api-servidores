import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, defer, finalize } from 'rxjs';
import { environment } from '../../environments/environment';
import { ServidorRequest, ServidorResponse } from '../dto/servidor.dto';

@Injectable({
  providedIn: 'root',
})
export class ServidorService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/servidores`;
  private readonly loadingSubject = new BehaviorSubject(false);
  private pendingRequests = 0;

  readonly loading$ = this.loadingSubject.asObservable();

  listar(): Observable<ServidorResponse[]> {
    return this.track(this.http.get<ServidorResponse[]>(this.apiUrl));
  }

  buscarPorId(id: string): Observable<ServidorResponse> {
    return this.track(this.http.get<ServidorResponse>(`${this.apiUrl}/${id}`));
  }

  criar(request: ServidorRequest): Observable<ServidorResponse> {
    return this.track(this.http.post<ServidorResponse>(this.apiUrl, request));
  }

  atualizar(id: string, request: ServidorRequest): Observable<ServidorResponse> {
    return this.track(this.http.put<ServidorResponse>(`${this.apiUrl}/${id}`, request));
  }

  excluir(id: string): Observable<void> {
    return this.track(this.http.delete<void>(`${this.apiUrl}/${id}`));
  }

  private track<T>(request$: Observable<T>): Observable<T> {
    return defer(() => {
      this.pendingRequests += 1;
      this.loadingSubject.next(true);

      return request$.pipe(
        finalize(() => {
          this.pendingRequests = Math.max(0, this.pendingRequests - 1);
          this.loadingSubject.next(this.pendingRequests > 0);
        }),
      );
    });
  }
}
