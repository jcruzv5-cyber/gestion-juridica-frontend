import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
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
  imports: [FormsModule],
  templateUrl: './pagos.component.html',
  styleUrl: './pagos.component.css'
})
export class PagosComponent {
  private readonly API = 'http://localhost:8860/kkom';

  pago: Pago = this.pagoVacio();
  pagos: Pago[] = [];
  buscarCasoId: number | null = null;
  editandoId: number | null = null;
  mensaje = '';
  error = '';
  cargando = false;
  buscado = false;

  constructor(private http: HttpClient) {}

  private pagoVacio(): Pago {
    return { valor: null, fecha: '', metodoPago: '', observaciones: '', comprobante: '', casoId: null };
  }

  registrar(form: NgForm) {
    if (form.invalid) { this.marcarTodos(form); return; }
    this.limpiarMensajes();
    this.cargando = true;
    this.http.post<Pago>(`${this.API}/pagos`, this.pago).subscribe({
      next: (nuevo) => {
        this.mensaje = '✅ Pago registrado exitosamente';
        form.resetForm();
        this.pago = this.pagoVacio();
        if (nuevo.casoId === this.buscarCasoId) this.pagos.unshift(nuevo);
        this.cargando = false;
      },
      error: (err) => {
        this.error = '❌ ' + (err.error?.mensaje ?? err.message ?? 'Error al registrar');
        this.cargando = false;
      }
    });
  }

  buscarPorCaso() {
    if (!this.buscarCasoId) return;
    this.limpiarMensajes();
    this.cargando = true;
    this.buscado = false;
    this.http.get<Pago[]>(`${this.API}/pagos/caso/${this.buscarCasoId}`).subscribe({
      next: (lista) => { this.pagos = lista; this.buscado = true; this.cargando = false; },
      error: (err) => {
        this.error = '❌ ' + (err.error?.mensaje ?? err.message ?? 'Error al buscar');
        this.cargando = false;
      }
    });
  }

  editar(p: Pago) {
    this.editandoId = p.id!;
    this.pago = { ...p };
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  guardarEdicion(form: NgForm) {
    if (form.invalid) { this.marcarTodos(form); return; }
    this.limpiarMensajes();
    this.cargando = true;
    this.http.put<Pago>(`${this.API}/pagos/${this.editandoId}`, this.pago).subscribe({
      next: (actualizado) => {
        this.mensaje = '✅ Pago actualizado exitosamente';
        const idx = this.pagos.findIndex(p => p.id === this.editandoId);
        if (idx !== -1) this.pagos[idx] = actualizado;
        this.cancelarEdicion(form);
        this.cargando = false;
      },
      error: (err) => {
        this.error = '❌ ' + (err.error?.mensaje ?? err.message ?? 'Error al actualizar');
        this.cargando = false;
      }
    });
  }

  eliminar(id: number, casoId: number | null) {
    if (!confirm('¿Confirma eliminar este pago? Esta acción no se puede deshacer.')) return;
    this.limpiarMensajes();
    this.http.delete(`${this.API}/pagos/${id}`).subscribe({
      next: () => {
        this.mensaje = '✅ Pago eliminado correctamente';
        this.pagos = this.pagos.filter(p => p.id !== id);
      },
      error: (err) => this.error = '❌ ' + (err.error?.mensaje ?? err.message ?? 'Error al eliminar')
    });
  }

  cancelarEdicion(form?: NgForm) {
    this.editandoId = null;
    this.pago = this.pagoVacio();
    form?.resetForm();
  }

  totalPagos(): number {
    return this.pagos.reduce((sum, p) => sum + (p.valor ?? 0), 0);
  }

  private marcarTodos(form: NgForm) {
    Object.values(form.controls).forEach(c => c.markAsTouched());
  }

  private limpiarMensajes() { this.mensaje = ''; this.error = ''; }
}
