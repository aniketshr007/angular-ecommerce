import { Component } from '@angular/core';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-category-menu',
  standalone: true,
  imports: [CommonModule, RouterModule], // Ensure RouterModule is imported here
  templateUrl: './product-category-menu.component.html',
  styleUrl: './product-category-menu.component.css'
})
export class ProductCategoryMenuComponent {
productCategories: ProductCategory[] =[];

constructor(private productService: ProductService){}

ngOnInit(){
  this.listProuctcategories();
}

  listProuctcategories() {
   this.productService.getProductCategories().subscribe(
    data =>{
      console.log('Product Categories='+ JSON.stringify(data));
      this.productCategories = data;
    }
   );
  }

}
