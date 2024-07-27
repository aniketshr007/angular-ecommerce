import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { Routes, RouterModule } from '@angular/router';
import { ProductCategoryMenuComponent } from "./components/product-category-menu/product-category-menu.component";
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from "./components/cart-status/cart-status.component"; 
import { CartDetailsComponent } from './components/cart-details/cart-details.component';

const routes: Routes = [
{path: 'cart-details', component: CartDetailsComponent},
{path: 'products/:id', component: ProductDetailsComponent},
{path: 'search/:keyword', component: ProductListComponent},
{path: 'category/:id', component: ProductListComponent},
{path: 'category', component: ProductListComponent},
{path: 'products', component: ProductListComponent},
{path: '', redirectTo: '/products', pathMatch:'full'}, //dont give a path
{path: '**', redirectTo: '/products', pathMatch:'full'} //path not found
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    SearchComponent,
    ProductCategoryMenuComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    NgbModule

],
  providers: [ProductService],   //helps for injecting dependecy in the whole project
  bootstrap: [AppComponent]
})
export class AppModule { }
