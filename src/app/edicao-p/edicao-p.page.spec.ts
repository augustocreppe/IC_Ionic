import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EdicaoPPage } from './edicao-p.page';

describe('EdicaoPPage', () => {
  let component: EdicaoPPage;
  let fixture: ComponentFixture<EdicaoPPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdicaoPPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EdicaoPPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
