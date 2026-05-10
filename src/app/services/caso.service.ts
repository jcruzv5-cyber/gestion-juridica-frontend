import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Caso } from "../interfaces/caso.model";

@Injectable({ providedIn: "root" })
export class CasoService {
  private apiUrl = "http://localhost:8860/api/casos";
  constructor(private http: HttpClient) {}
  listarCasos(): Observable<Caso[]> {
    return this.http.get<Caso[]>(this.apiUrl);
  }
}
