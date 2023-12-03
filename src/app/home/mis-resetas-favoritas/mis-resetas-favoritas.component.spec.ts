import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MisResetasFavoritasComponent } from './mis-resetas-favoritas.component';

describe('MisResetasFavoritasComponent', () => {
  let component: MisResetasFavoritasComponent;
  let fixture: ComponentFixture<MisResetasFavoritasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MisResetasFavoritasComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MisResetasFavoritasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
