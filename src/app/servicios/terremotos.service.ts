import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Terremoto } from '../interfaces/terremoto';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TerremotosService {

  constructor(private http: HttpClient) { }

  getUltimosTerremotos(): Observable<Terremoto>{
    return this.http.get<Terremoto>(`${environment.baseUrl}/query?format=geojson&orderby=time&limit=5`);
  }
   
  getTerremotosPorFecha(startTime: string, endTime: string): Observable<Terremoto>{
    return this.http.get<Terremoto>(`${environment.baseUrl}/query?format=geojson&starttime=${startTime}&endtime=${endTime}`); 
  }
  
  getTerremotosPorMagnitud(minMagnitude: number): Observable<Terremoto> {
    return this.http.get<Terremoto>(`${environment.baseUrl}/query?format=geojson&orderby=time&minmagnitude=${minMagnitude}`);
  }
}

