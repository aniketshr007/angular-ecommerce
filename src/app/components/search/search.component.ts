import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, RouterModule], // Ensure RouterModule is imported here
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  constructor(private route: Router){}

  ngOnInit(){

  }

  doSearch(value: string){
    console.log(`value=${value}`);
    this.route.navigateByUrl(`/search/${value}`);
  }
}
