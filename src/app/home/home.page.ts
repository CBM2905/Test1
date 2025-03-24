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
  state: number = 0;
  
  constructor(private loadingCtlr: LoadingController, private terremotoService: TerremotosService, private alertCreator: AlertController) {
    this.loadTerromotos();
  }


  async loadTerromotos(event?: InfiniteScrollCustomEvent){
    this.state = 0;
    const loading = await this.loadingCtlr.create({
      message: 'Loading',
      spinner: 'bubbles'
    });
    await loading.present();

    this.terremotoService.getUltimosTerremotos().subscribe(
      (data) => {
        loading.dismiss();
        this.terremotos.splice(0,this.terremotos.length);
        this.terremotos.push(...data.features);
        event?.target.complete();
      }
    )
  }

  loadMore(event: InfiniteScrollCustomEvent){
    if(this.state == 0){
      this.loadTerromotos();
    }
    else if(this.state == 1){
      this.searchByFechaIF();
    }
  }


  

  async searchByFechaIF(){
    let alert = this.alertCreator.create({
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
            if(this.state == 0){
              this.terremotos.splice(0, this.terremotos.length);
            }
            this.state = 1;
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
  


  

}
