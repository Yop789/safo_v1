import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MisTiendasFavoritasComponent } from './mis-tiendas-favoritas.component';

describe('MisTiendasFavoritasComponent', () => {
  let component: MisTiendasFavoritasComponent;
  let fixture: ComponentFixture<MisTiendasFavoritasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MisTiendasFavoritasComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MisTiendasFavoritasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
