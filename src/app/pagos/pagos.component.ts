import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Pago {
  id?: number;
  valor: number | null;
  fecha: string;
  metodoPago: string;
  observaciones: string;
  comprobante: string;
  casoId: number | null;
  fechaCreacion?: string;
}

@Component({
  selector: 'app-pagos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pagos.component.html'
})
export class PagosComponent {
  private readonly API = 'http://localhost:8860';

  pago: Pago = this.pagoVacio();
  pagos: Pago[] = [];
  buscarCasoId: number | null = null;
  editandoId: number | null = null;
  mensaje = '';
  error = '';

  constructor(private http: HttpClient) {}

  private pagoVacio(): Pago {
    return {
      valor: null,
      fecha: '',
      metodoPago: '',
      observaciones: '',
      comprobante: '',
      casoId: null
    };
  }

  registrar() {
    this.limpiarMensajes();
    this.http.post<Pago>(`${this.API}/pagos`, this.pago).subscribe({
      next: (nuevo) => {
        this.mensaje = 'Pago registrado exitosamente';
        this.pago = this.pagoVacio();
        if (nuevo.casoId === this.buscarCasoId) {
          this.pagos.unshift(nuevo);
        }
      },
      error: (err) => (this.error = 'Error al registrar: ' + (err.error?.mensaje ?? err.message))
    });
  }

  buscarPorCaso() {
    if (!this.buscarCasoId) return;
    this.limpiarMensajes();
    this.http.get<Pago[]>(`${this.API}/pagos/caso/${this.buscarCasoId}`).subscribe({
      next: (lista) => (this.pagos = lista),
      error: (err) => (this.error = 'Error al buscar: ' + (err.error?.mensaje ?? err.message))
    });
  }

  editar(p: Pago) {
    this.editandoId = p.id!;
    this.pago = { ...p };
  }

  guardarEdicion() {
    this.limpiarMensajes();
    this.http.put<Pago>(`${this.API}/pagos/${this.editandoId}`, this.pago).subscribe({
      next: (actualizado) => {
        this.mensaje = 'Pago actualizado exitosamente';
        const idx = this.pagos.findIndex((p) => p.id === this.editandoId);
        if (idx !== -1) this.pagos[idx] = actualizado;
        this.cancelarEdicion();
      },
      error: (err) => (this.error = 'Error al actualizar: ' + (err.error?.mensaje ?? err.message))
    });
  }

  eliminar(id: number) {
    if (!confirm('¿Confirma eliminar este pago?')) return;
    this.limpiarMensajes();
    this.http.delete(`${this.API}/pagos/${id}`).subscribe({
      next: () => {
        this.mensaje = 'Pago eliminado';
        this.pagos = this.pagos.filter((p) => p.id !== id);
      },
      error: (err) => (this.error = 'Error al eliminar: ' + (err.error?.mensaje ?? err.message))
    });
  }

  cancelarEdicion() {
    this.editandoId = null;
    this.pago = this.pagoVacio();
  }

  private limpiarMensajes() {
    this.mensaje = '';
    this.error = '';
  }
}
