import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CadastroPPage } from './cadastro-p.page';

describe('CadastroPPage', () => {
  let component: CadastroPPage;
  let fixture: ComponentFixture<CadastroPPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroPPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CadastroPPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
