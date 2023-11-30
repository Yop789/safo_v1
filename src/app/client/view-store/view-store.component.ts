import { StoreService } from './../../services/api/store.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-store',
  templateUrl: './view-store.component.html',
  styleUrls: ['./view-store.component.scss'],
})
export class ViewStoreComponent implements OnInit {
  idStore: any;
  imageUrl: any;
  lng: number;
  lat: number;
  constructor(
    private route: ActivatedRoute,
    private storeService: StoreService
  ) {
    this.getStoreBy();
  }

  ngOnInit() {}
  getStoreBy() {
    this.idStore = this.route.snapshot.params['id'];
    this.storeService.getStoreByID(this.idStore).subscribe((data: any) => {
      this.imageUrl = data.image;
      this.lat = data.lat;
      this.lng = data.log;
    });
  }
}
