import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EdicaoVPage } from './edicao-v.page';

describe('EdicaoVPage', () => {
  let component: EdicaoVPage;
  let fixture: ComponentFixture<EdicaoVPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdicaoVPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EdicaoVPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
