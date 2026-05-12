import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registrar-abogado',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registrar-abogado.component.html'
})
export class RegistrarAbogadoComponent {
  abogado = {
    nombreCompleto: '',
    numeroCedula: '',
    tarjetaProfesional: '',
    especialidad: '',
    correoElectronico: '',
    telefono: ''
  };

  constructor(private http: HttpClient) {}

  registrar() {
    this.http.post('http://localhost:8860/kkom/abogados', this.abogado)
      .subscribe({
        next: () => alert('Abogado registrado exitosamente'),
        error: (err) => alert('Error: ' + err.message)
      });
  }
}
