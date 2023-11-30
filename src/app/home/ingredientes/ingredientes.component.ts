import { Ingredient } from './../../models/ingredient';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-ingredientes',
  templateUrl: './ingredientes.component.html',
  styleUrls: ['./ingredientes.component.scss'],
})
export class IngredientesComponent implements OnInit {
  form: FormGroup;
  listIngred: Ingredient[] = [];
  index: number = 0;
  edit: boolean = false;

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    public navParams: NavParams
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      unit: ['', [Validators.required]],
      type: ['', [Validators.required]],
    });
    this.listIngred = this.navParams.get('ingredientesIniciales');
  }

  ngOnInit() {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.listIngred, 'confirm');
  }
  agregarIngrediente() {
    this.listIngred.push(this.form.value);
    this.limpiar();
  }
  eliminarIngrediente() {
    this.listIngred.splice(this.index, 1);
    this.edit = false;
    this.limpiar();
  }
  actualizarIngrediente() {
    this.listIngred[this.index] = this.form.value;
    this.edit = false;
    this.limpiar();
  }
  limpiar() {
    this.form.reset();
  }
  select(index: number) {
    this.edit = true;
    this.index = index;
    const data = this.listIngred[index];
    this.form.patchValue(data);
  }
}
