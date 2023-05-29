import { Component, OnInit } from '@angular/core';
import { EventoService } from 'src/app/services/evento.service';
import { SeoModel, SeoService } from 'src/app/services/seo.service';
import { Evento, Team } from '../modls_eventos/evento';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-lista-eventos',
  templateUrl: './lista-eventos.component.html',
  styleUrls: ['./lista-eventos.component.css']
})


export class ListaEventosComponent implements OnInit {

  public teamsNg: Team[];
  errorMessage: string;
  

  constructor(seoService: SeoService, private eventoService: EventoService,private route: ActivatedRoute){
   
    let seoModel: SeoModel = <SeoModel>{
      title: 'Brasil A',
      description: "Melhores apostas de futebol",
      robots: 'Index,Follow',
      keywords: 'bet365,apostas,lucro,renda,extra'
    };
  seoService.setSeoDate(seoModel);
  }

  async ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const idLiga = params['idLiga'];
      if (idLiga) {
        this.eventoService.ObterTeams(idLiga).subscribe(
          teams => {
            this.teamsNg = teams;
            console.log(this.teamsNg); // Adicione o console.log aqui
          },
          error => this.errorMessage = error
        );
      }
    });
  }
  
}
