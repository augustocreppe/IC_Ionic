import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CadastroVPage } from './cadastro-v.page';

describe('CadastroVPage', () => {
  let component: CadastroVPage;
  let fixture: ComponentFixture<CadastroVPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroVPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CadastroVPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
