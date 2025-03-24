import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Terremoto } from '../interfaces/terremoto';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TerremotosService {
  private apiUrl: string = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson';


  constructor(private http: HttpClient) { }

  getUltimosTerremotos(): Observable<Terremoto>{
    return this.http.get<Terremoto>(`${environment.baseUrl}/query?format=geojson&orderby=time&limit=5`);
  }
   
  getTerremotosPorFecha(startTime: string, endTime: string): Observable<Terremoto>{
    return this.http.get<Terremoto>(`${environment.baseUrl}/query?format=geojson&starttime=${startTime}&endtime=${endTime}&limit=80`); 
  }
  
  getTerremotosPorMagnitud(minMagnitude: number): Observable<Terremoto> {
    return this.http.get<Terremoto>(`${environment.baseUrl}/query?format=geojson&orderby=time&minmagnitude=${minMagnitude}`);
  }
  getTerremotosPorCiudad(lat: number, lon: number, radio: number = 500): Observable<any> {
    return this.http.get(`${this.apiUrl}&latitude=${lat}&longitude=${lon}&maxradiuskm=${radio}&limit=50`);
  }
}

