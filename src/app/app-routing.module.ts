import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'info',
    loadChildren: () => import('./info/info.module').then( m => m.InfoPageModule)
  },
  {
    path: 'camera',
    loadChildren: () => import('./camera/camera.module').then( m => m.CameraPageModule)
  },
  {
    path: 'digitar',
    loadChildren: () => import('./digitar/digitar.module').then( m => m.DigitarPageModule)
  },
  {
    path: 'cadastro-p',
    loadChildren: () => import('./cadastro-p/cadastro-p.module').then( m => m.CadastroPPageModule)
  },
  {
    path: 'cadastro-v',
    loadChildren: () => import('./cadastro-v/cadastro-v.module').then( m => m.CadastroVPageModule)
  },
  {
    path: 'search-p',
    loadChildren: () => import('./search-p/search-p.module').then( m => m.SearchPPageModule)
  },
  {
    path: 'search-v',
    loadChildren: () => import('./search-v/search-v.module').then( m => m.SearchVPageModule)
  },
  {
    path: 'edicao-p/:id',
    loadChildren: () => import('./edicao-p/edicao-p.module').then( m => m.EdicaoPPageModule)
  },
  {
    path: 'edicao-v/:id',
    loadChildren: () => import('./edicao-v/edicao-v.module').then( m => m.EdicaoVPageModule)
  },
  {
    path: 'conta',
    loadChildren: () => import('./conta/conta.module').then( m => m.ContaPageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }