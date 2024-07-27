import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {ActivatedRoute, RouterModule } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterModule], // Ensure RouterModule is imported here
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {


  product!: Product;

  constructor(private productService : ProductService,
     private route: ActivatedRoute,
     private cartService: CartService){}

  ngOnInit(){
    this.route.paramMap.subscribe(()=>{
      this.handleProductDetails();
    })
  }
  handleProductDetails() {
    const theProductId: number = +this.route.snapshot.paramMap.get('id')!;

    this.productService.getProduct(theProductId).subscribe(
      data =>{
        this.product = data;
      }
    )
  }

  addToCart() {
    const cartItem = new CartItem(this.product);

    this.cartService.addToCart(cartItem);

    }

}
