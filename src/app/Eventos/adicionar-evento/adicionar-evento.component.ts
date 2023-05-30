import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnotifireService } from 'ngx-snotifire';
import { fromEvent, merge, Observable } from 'rxjs';
import { EventoService } from 'src/app/services/evento.service';
import { GenericValidator } from 'src/app/utils/generic.form.validator';
import { BetInputModel, BetResult, CalculatedProbabilities, Categoria, Endereco, Evento } from '../modls_eventos/evento';
import { DateUtils } from 'src/app/utils/data-type-utils';


@Component({
  selector: 'app-adicionar-evento',
  templateUrl: './adicionar-evento.component.html',
  styleUrls: ['./adicionar-evento.component.scss']
})
export class AdicionarEventoComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  public myDatePickerOptions = DateUtils.getMyDatePickerOptions();

  public timesForm: FormGroup;
  public errors: any[] = [];
  public betResult: BetResult;
  public evento: Evento;
  public times: BetInputModel;
  public categorias: Categoria[];
  public gratuito: Boolean;
  public online: Boolean;
  isLoading: boolean = false;
 public calculatedProbabilities: CalculatedProbabilities;

  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;
  public displayMessage: { [key: string]: string } = {};

  constructor(private fb: FormBuilder, private router: Router, private snotifireService: SnotifireService, private eventoService : EventoService) {
    this.validationMessages = {
      time1: {
        require: 'O Nome é requirido',
      },
      time2: {
        require: 'O time1 é requirido',
      }
    }
    this.genericValidator = new GenericValidator(this.validationMessages);
    this.evento = new Evento();
    this.times = new BetInputModel();
    this.evento.endereco = new Endereco();
  }

  ngOnInit() {
    this.timesForm = this.fb.group({
      time1: ['', [Validators.required]],
      time2: ['', [Validators.required]],
    });
  }


  ngAfterViewInit() {
    let controlBlurs: Observable<any>[] = this.formInputElements.map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.timesForm);
    });
  }

  adicionarEvento() {
    if (this.timesForm.valid && this.timesForm.dirty) {
      // Mostrar mensagem de carregamento
      this.isLoading = true;

      const evento: BetInputModel = {
        Time1: this.timesForm.value.time1,
        Time2: this.timesForm.value.time2
      };

      this.eventoService.BuscarResult(evento).subscribe(
        result => {
          // Esconder mensagem de carregamento
          this.isLoading = false;

          this.betResult = result;
          this.calculatedProbabilities = {
            probabilityOver15: (100 - parseFloat(result.probabilityOver15)).toFixed(2) + '%',
            probabilityOver25: (100 - parseFloat(result.probabilityOver25)).toFixed(2) + '%',
            probabilityUnder35: (100 - parseFloat(result.probabilityUnder35)).toFixed(2) + '%',
            probabilityUnder45: (100 - parseFloat(result.probabilityUnder45)).toFixed(2) + '%',
            probabilityUnder15: (100 - parseFloat(result.probabilityUnder15)).toFixed(2) + '%',
            probabilityOver05: (parseFloat(result.probabilityOver05)).toFixed(2) + '%',
            probabilityOver35: (100 - parseFloat(result.probabilityOver35)).toFixed(2) + '%',
            probabilityOver45: (100 - parseFloat(result.probabilityOver45)).toFixed(2) + '%',
            probabilityUnder25: (100 - parseFloat(result.probabilityUnder25)).toFixed(2) + '%'
          };
          this.onSalveComplete(result);
        },
        error => {
          // Esconder mensagem de carregamento
          this.isLoading = false;
          this.onError(error);
        }
      );
    }
  }
  
  
  
  

  onSalveComplete(response: any){
    this.timesForm.reset();
    this.errors = [];
    let toasterMessage =  this.snotifireService.success('Opa Deu Certo ;)', 'Sucesso', {
      timeout: 2000,
      showProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
    });

    if(toasterMessage){
      toasterMessage.eventEmitter.subscribe(()=>{
        
      }
      
      );
    }
    
  }

  onError(fail: any) {

  this.snotifireService.error('Ocorreu um erro!', 'OPS!', {
      timeout: 2000,
      showProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
    });
    this.errors = fail.error.errors;

  }
}
