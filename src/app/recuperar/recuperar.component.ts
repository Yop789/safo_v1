import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.scss'],
})
export class RecuperarComponent  implements OnInit {

  formRecuperar: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.formRecuperar = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  recuperar (){
    
  }

  ngOnInit() {}

}
