export interface Cliente {
  tipoDocumento: string;
  numeroDocumento: string;
  nombres: string;
  apellidos: string;
  fechaNacimiento: string;
  genero: string;
  estadoCivil: string;
  direccionResidencia: string;
  ciudadMunicipio: string;
  barrio: string;
  telefonoPrincipal: string;
  telefonoSecundario: string;
  correoElectronico: string;
  estratoSocioeconomico: string;
  ingresosMensuales: string;
  ocupacion: string;
  indicadorPoblacionVulnerable: boolean;
  tipoPoblacionVulnerable: string;
  aceptaHabeasData: boolean;
  estadoUsuario: string;
}
