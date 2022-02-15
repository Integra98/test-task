import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditPriceListComponent } from './components/edit-price-list/edit-price-list.component';
import { PriceListComponent } from './components/price-list/price-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'price-list', pathMatch: 'full' },
  { path: 'price-list', component: PriceListComponent },
  { path: 'price-list/:id', component: EditPriceListComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
