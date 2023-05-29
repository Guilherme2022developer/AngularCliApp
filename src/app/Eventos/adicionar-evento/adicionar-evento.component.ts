import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnotifireService } from 'ngx-snotifire';
import { fromEvent, merge, Observable } from 'rxjs';
import { EventoService } from 'src/app/services/evento.service';
import { GenericValidator } from 'src/app/utils/generic.form.validator';
import { BetInputModel, BetResult, Categoria, Endereco, Evento } from '../modls_eventos/evento';
import { DateUtils } from 'src/app/utils/data-type-utils';


@Component({
  selector: 'app-adicionar-evento',
  templateUrl: './adicionar-evento.component.html',
  styleUrls: []
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
      const evento: BetInputModel = {
        Time1: this.timesForm.value.time1,
        Time2: this.timesForm.value.time2
      };
  
      this.eventoService.BuscarResult(evento).subscribe(
        result => {
           // Exibe o resultado no console.log
          this.betResult = result; // Atribui o resultado à propriedade betResult
          this.onSalveComplete(result);
          console.log(result);
        },
        error => {
          this.onError(error);
        }
      );
    }
  }
  
  

  onSalveComplete(response: any){
    this.timesForm.reset();
    this.errors = [];
    let toasterMessage =  this.snotifireService.success('Opa Deu Certo', 'Sucesso ;)', {
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
