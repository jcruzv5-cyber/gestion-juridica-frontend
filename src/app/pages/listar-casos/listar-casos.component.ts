import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CasoService } from "../../services/caso.service";
import { Caso } from "../../interfaces/caso.model";

@Component({
  selector: "app-listar-casos",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./listar-casos.component.html",
  styleUrls: ["./listar-casos.component.css"]
})
export class ListarCasosComponent implements OnInit {
  casos: Caso[] = [];
  cargando = true;
  error = false;
  constructor(private casoService: CasoService) {}
  ngOnInit(): void { this.cargarCasos(); }
  cargarCasos(): void {
    this.cargando = true; this.error = false;
    this.casoService.listarCasos().subscribe({
      next: (data) => { this.casos = data; this.cargando = false; },
      error: (err) => { console.error("Error:", err); this.error = true; this.cargando = false; }
    });
  }
  getPrioridadClase(p: string): string {
    switch(p?.toUpperCase()) {
      case "ALTA": return "prioridad-alta";
      case "MEDIA": return "prioridad-media";
      case "BAJA": return "prioridad-baja";
      default: return "";
    }
  }
  getEstadoClase(e: string): string {
    switch(e?.toUpperCase()) {
      case "ABIERTO": return "estado-abierto";
      case "EN_PROCESO": return "estado-proceso";
      case "CERRADO": return "estado-cerrado";
      default: return "";
    }
  }
}
