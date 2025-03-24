import { Component } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController, AlertController } from '@ionic/angular';
import { TerremotosService } from '../servicios/terremotos.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  terremotos: any[] = [];

  constructor(
    private loadingCtlr: LoadingController,
    private terremotoService: TerremotosService,
    private alertController: AlertController
  ) {
    this.loadTerromotos();
  }

  async loadTerromotos(event?: InfiniteScrollCustomEvent, minMagnitude?: number) {
    const loading = await this.loadingCtlr.create({
      message: 'Cargando...',
      spinner: 'bubbles'
    });
    await loading.present();

    let observable;
    if (minMagnitude) {
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
    this.loadTerromotos(event);
  }

  async filtrarPorMagnitud() {
    const alert = await this.alertController.create({
      header: 'Filtrar Sismos',
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
}

