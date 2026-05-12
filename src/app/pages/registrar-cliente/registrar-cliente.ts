import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../interfaces/cliente';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-registrar-cliente',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    InputTextModule,
    SelectModule,
    CheckboxModule,
    ButtonModule,
    MessageModule
  ],
  templateUrl: './registrar-cliente.html',
  styleUrl: './registrar-cliente.css'
})
export class RegistrarCliente {
  private clienteService = inject(ClienteService);

  mensajeExito = '';
  mensajeError = '';
  enviado = false;
  cargando = false;

  tipoDocumentoOptions = [
    { label: 'CC', value: 'CC' },
    { label: 'CE', value: 'CE' },
    { label: 'Pasaporte', value: 'Pasaporte' },
    { label: 'PPT', value: 'PPT' }
  ];

  generoOptions = [
    { label: 'Masculino', value: 'Masculino' },
    { label: 'Femenino', value: 'Femenino' },
    { label: 'Otro', value: 'Otro' }
  ];

  estadoCivilOptions = [
    { label: 'Soltero', value: 'Soltero' },
    { label: 'Casado', value: 'Casado' },
    { label: 'Unión Libre', value: 'Unión Libre' },
    { label: 'Divorciado', value: 'Divorciado' },
    { label: 'Viudo', value: 'Viudo' }
  ];

  estadoUsuarioOptions = [
    { label: 'Activo', value: 'Activo' },
    { label: 'Inactivo', value: 'Inactivo' },
    { label: 'Vetado', value: 'Vetado' }
  ];

  poblacionVulnerableOptions = [
    { label: 'No', value: false },
    { label: 'Sí', value: true }
  ];

  cliente: Cliente = this.obtenerClienteVacio();

  obtenerClienteVacio(): Cliente {
    return {
      tipoDocumento: '',
      numeroDocumento: '',
      nombres: '',
      apellidos: '',
      fechaNacimiento: '',
      genero: '',
      estadoCivil: '',
      direccionResidencia: '',
      ciudadMunicipio: '',
      barrio: '',
      telefonoPrincipal: '',
      telefonoSecundario: '',
      correoElectronico: '',
      estratoSocioeconomico: '',
      ingresosMensuales: '',
      ocupacion: '',
      indicadorPoblacionVulnerable: false,
      tipoPoblacionVulnerable: '',
      aceptaHabeasData: false,
      estadoUsuario: 'Activo'
    };
  }

  campoInvalido(campo: any): boolean {
    return !!campo && campo.invalid && (campo.touched || this.enviado);
  }

  mostrarExitoTemporal(mensaje: string): void {
    this.mensajeExito = mensaje;

    setTimeout(() => {
      this.mensajeExito = '';
    }, 3000);
  }

  mostrarErrorTemporal(mensaje: string): void {
    this.mensajeError = mensaje;

    setTimeout(() => {
      this.mensajeError = '';
    }, 3000);
  }

  guardarCliente(formulario: NgForm): void {
    this.enviado = true;
    this.mensajeExito = '';
    this.mensajeError = '';

    if (formulario.invalid || !this.cliente.aceptaHabeasData) {
      this.mostrarErrorTemporal('Debes completar correctamente los campos obligatorios.');
      return;
    }

    this.cargando = true;

    this.clienteService.crearCliente(this.cliente).subscribe({
      next: () => {
        this.cargando = false;
        this.mensajeError = '';
        this.mostrarExitoTemporal('Cliente registrado correctamente.');
        this.enviado = false;

        this.cliente = this.obtenerClienteVacio();

        formulario.resetForm({
          tipoDocumento: '',
          numeroDocumento: '',
          nombres: '',
          apellidos: '',
          fechaNacimiento: '',
          genero: '',
          estadoCivil: '',
          direccionResidencia: '',
          ciudadMunicipio: '',
          barrio: '',
          telefonoPrincipal: '',
          telefonoSecundario: '',
          correoElectronico: '',
          estratoSocioeconomico: '',
          ingresosMensuales: '',
          ocupacion: '',
          indicadorPoblacionVulnerable: false,
          tipoPoblacionVulnerable: '',
          aceptaHabeasData: false,
          estadoUsuario: 'Activo'
        });
      },
      error: (error) => {
        this.cargando = false;
        this.mensajeExito = '';

        if (typeof error?.error === 'string' && error.error.trim() !== '') {
          this.mostrarErrorTemporal(error.error);
        } else if (error?.error?.message) {
          this.mostrarErrorTemporal(error.error.message);
        } else {
          this.mostrarErrorTemporal('No se pudo registrar el cliente.');
        }

        console.error('Error al registrar cliente:', error);
      }
    });
  }

  limpiarFormulario(formulario: NgForm): void {
    this.cliente = this.obtenerClienteVacio();
    this.mensajeExito = '';
    this.mensajeError = '';
    this.enviado = false;

    formulario.resetForm({
      tipoDocumento: '',
      numeroDocumento: '',
      nombres: '',
      apellidos: '',
      fechaNacimiento: '',
      genero: '',
      estadoCivil: '',
      direccionResidencia: '',
      ciudadMunicipio: '',
      barrio: '',
      telefonoPrincipal: '',
      telefonoSecundario: '',
      correoElectronico: '',
      estratoSocioeconomico: '',
      ingresosMensuales: '',
      ocupacion: '',
      indicadorPoblacionVulnerable: false,
      tipoPoblacionVulnerable: '',
      aceptaHabeasData: false,
      estadoUsuario: 'Activo'
    });
  }
}
