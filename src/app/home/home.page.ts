import { Component } from '@angular/core';
import { AlertController, InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { TerremotosService } from '../servicios/terremotos.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  terremotos: any[] = [];

  ciudades = [
    { nombre: "Tokio", lat: 35.6895, lon: 139.6917 },
    { nombre: "Los Ángeles", lat: 34.0522, lon: -118.2437 },
    { nombre: "Ciudad de México", lat: 19.4326, lon: -99.1332 },
    { nombre: "Santiago", lat: -33.4489, lon: -70.6693 },
    { nombre: "Estambul", lat: 41.0082, lon: 28.9784 },
    { nombre: "Teherán", lat: 35.6892, lon: 51.3890 },
    { nombre: "Manila", lat: 14.5995, lon: 120.9842 },
    { nombre: "Jakarta", lat: -6.2088, lon: 106.8456 },
    { nombre: "San Francisco", lat: 37.7749, lon: -122.4194 },
    { nombre: "Atenas", lat: 37.9838, lon: 23.7275 }
  ];

  constructor(
    private loadingCtlr: LoadingController,
    private terremotoService: TerremotosService,
    private alertController: AlertController
  ) {
    this.loadTerromotos();
  }

  async loadTerromotos(event?: InfiniteScrollCustomEvent, minMagnitude?: number, lat?: number, lon?: number) {
    const loading = await this.loadingCtlr.create({
      message: 'Cargando...',
      spinner: 'bubbles'
    });
    await loading.present();

    let observable;
    if (lat !== undefined && lon !== undefined) {
      observable = this.terremotoService.getTerremotosPorCiudad(lat, lon);
    } else if (minMagnitude) {
      observable = this.terremotoService.getTerremotosPorMagnitud(minMagnitude);
    } else {
      observable = this.terremotoService.getUltimosTerremotos();
    }

    observable.subscribe((data) => {
      loading.dismiss();
      this.terremotos.splice(0, this.terremotos.length);
      this.terremotos.push(...data.features);
      event?.target.complete();
    });
  }

  loadMore(event: InfiniteScrollCustomEvent) {
    
      this.loadTerromotos();
    
    
  }


  

  async searchByFechaIF(){
    let alert = this.alertController.create({
      header: "buscar terremotos por fecha",
      message: "ingrese las fechas [inicio] y [fin]",
      inputs: [
        {
          name: "fechaI",
          label: "fecha Inicio",
          type: 'text'
        },
        {
          name: "fechaF",
          label: "fecha fin",
          type: "text"
        }
      ],
      buttons: [
        {
          text: "buscar",
          handler: (data) => {
            
            this.terremotos.splice(0, this.terremotos.length);
            this.terremotoService.getTerremotosPorFecha(data.fechaI, data.fechaF).subscribe(
              (dataAPI) => {
                this.terremotos.push(...dataAPI.features);
              }
            )
          }
        }
      ]
    });
    (await alert).present();    
  }

  async filtrarPorMagnitud() {
    const alert = await this.alertController.create({
      header: 'Filtrar Sismos por Magnitud',
      inputs: [
        {
          name: 'magnitud',
          type: 'number',
          placeholder: 'Ingrese magnitud mínima'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Buscar',
          handler: (data) => {
            this.loadTerromotos(undefined, data.magnitud);
          }
        }
      ]
    });

    await alert.present();
  }

  async filtrarPorCiudad() {
    const alert = await this.alertController.create({
      header: 'Selecciona una Ciudad',
      inputs: this.ciudades.map((ciudad) => ({
        name: 'ciudad',
        type: 'radio',
        label: ciudad.nombre,
        value: ciudad
      })),
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Buscar',
          handler: (ciudadSeleccionada) => {
            if (ciudadSeleccionada) {
              this.loadTerromotos(undefined, undefined, ciudadSeleccionada.lat, ciudadSeleccionada.lon);
            }
          }
        }
      ]
    });

    await alert.present();
  }
}
