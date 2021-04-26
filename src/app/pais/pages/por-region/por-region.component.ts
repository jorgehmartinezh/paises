import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [
    `
    button{
      margin-right: 7px;
    }
    `
  ]
})
export class PorRegionComponent{

  regiones: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];
  paises  : Country[] = [];

  regionActiva: string = '';
  hayError: boolean = false;
  termino: string = '';

  constructor(private paisService: PaisService) { }

  activarRegion(region: string){

    if(region === this.regionActiva){ return; }

    this.paises = [];
    this.regionActiva = region;

    this.hayError = false;
    this.termino  = region;

    this.paisService.buscarRegion( this.termino )
      .subscribe( (paises) => {
        this.paises = paises;
      }, (err) => {
        this.hayError = true;
        this.paises   = [];
      });
  }

  getClaseCSS(region: string): string{
    return (this.regionActiva===region) ? 'btn btn-primary': 'btn btn-outline-primary';
  }

}
