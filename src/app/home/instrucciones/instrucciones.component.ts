import { Step } from './../../models/step';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-instrucciones',
  templateUrl: './instrucciones.component.html',
  styleUrls: ['./instrucciones.component.scss'],
})
export class InstruccionesComponent implements OnInit {
  form: FormGroup;
  listInstr: Step[] = [];
  index: number = 0;
  edit: boolean = false;

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    public navParams: NavParams
  ) {
    this.form = this.fb.group({
      step: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
    this.listInstr = this.navParams.get('instruccionesIniciales');
  }

  ngOnInit() {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.listInstr, 'confirm');
  }
  agregarIngrediente() {
    this.listInstr.push(this.form.value);
    this.limpiar();
  }
  eliminarIngrediente() {
    this.listInstr.splice(this.index, 1);
    this.edit = false;
    this.limpiar();
  }
  actualizarIngrediente() {
    this.listInstr[this.index] = this.form.value;
    this.edit = false;
    this.limpiar();
  }
  limpiar() {
    this.form.reset();
  }
  select(index: number) {
    this.edit = true;
    this.index = index;
    const data = this.listInstr[index];
    this.form.patchValue(data);
  }
}
