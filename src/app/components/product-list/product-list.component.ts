import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  //new properties for pagination
  thePageNumber = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  previousKeyword: string = "";

  constructor(private productService: ProductService, 
              private route: ActivatedRoute,
            private cartService: CartService) { }
              //Auto dependency Injection; route is the activate/current route

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if(this.searchMode){
      this.handleSearchProducts();
    }else{
      this.handleListProducts();
    }
  }

  handleListProducts() {
    //check if "id" param is available, snapshot-> state of route and this instatnce, paramMap-> map of all route params
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    } else {
      this.currentCategoryId = 1;
    }

    //
    //Check if we have a different category than previous
    //Note: Angular will reuse a component if it is currently being viewed
    //

    //if we have a different category id than previous
    //then set thePageNumber back to 1
    if(this.previousCategoryId != this.currentCategoryId){
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    console.log(`currentCategoryId= ${this.currentCategoryId} , thePageNumber= ${this.thePageNumber}`);

    //get the product for this id
    this.productService.getProductListPaginate(this.thePageNumber - 1,
                                              this.thePageSize, 
                                              this.currentCategoryId).subscribe(
                                                this.processResult());
  }

  handleSearchProducts() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;
    //if we have a different keyword than previous
    //then set thePageNumber to 1

    if (this.previousKeyword != theKeyword) {
      this.thePageNumber = 1;
    }

    this.previousKeyword = theKeyword;

    console.log(`keyword=${theKeyword}, the PageNumber=${this.thePageNumber}`)

    //now search the products using the keyword
    this.productService.searchProductsPaginate(this.thePageNumber -1,
                                              this.thePageSize, 
                                              theKeyword).subscribe(this.processResult());
  }

  processResult() {
    return (data: any) =>{
      this.products = data._embedded.products;
      this.thePageNumber =data.page.thePageNumber + 1;
      this.thePageSize =data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }

  updatePageSize(pageSize: string) {
  this.thePageSize = +pageSize;  // '+' changes string to number
  this.thePageNumber = 1;
  this.listProducts();  
    }

    addToCart(theProduct: Product) {
      console.log(`${theProduct.name} | ${theProduct.description}`)

      const theCartItem = new CartItem(theProduct);

      this.cartService.addToCart(theCartItem);


      }
      

}
