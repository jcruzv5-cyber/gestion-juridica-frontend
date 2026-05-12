import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../interfaces/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8860/clientes';

crearCliente(cliente: Cliente) {
  return this.http.post('http://localhost:8860/clientes', cliente, {
    observe: 'response'
  });
}

  listarClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }
}
