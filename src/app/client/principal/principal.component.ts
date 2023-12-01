import { StoreService } from './../../services/api/store.service';
import { Store } from './../../models/store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
})
export class PrincipalComponent implements OnInit {
  public items: Store[] = [];
  constructor(private storeService: StoreService) {}
  ionViewDidEnter() {
    this.getData();
  }
  ngOnInit() {}
  getData() {
    this.storeService.getStoreByIdUser().subscribe((stores: any) => {
      this.items = stores;
    });
  }
}
