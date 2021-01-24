import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DigitarPage } from './digitar.page';

describe('DigitarPage', () => {
  let component: DigitarPage;
  let fixture: ComponentFixture<DigitarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DigitarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DigitarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
