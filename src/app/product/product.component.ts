import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter } from 'minimatch';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productArray: any;
  output : any;
  product: string[];
  private BASE_URL: string = "http://localhost:3000/products";
  constructor(private httpService: HttpClient) { }


  ngOnInit() {
    this.httpService.get(this.BASE_URL).subscribe(data => {
      this.productArray = data;
      let productarray = this.productArray;
      // console.log("productarray", productarray);
      //  Filter Parent Category
      let products = this.distinctObject(productarray, 'parent_category', 'parent_name');
      // Filter Catefory by Group
      products.forEach(parent => {
      let filterGroup = this.distinctObject(parent.value, 'group_category', 'group_name');
      parent.value = filterGroup;
        console.log("parent value",parent.value);
      });
      this.output = products;
      console.log("output==",this.output);
    });
  }


  // Distinct objects by property value from an array of objects 
  distinctObject(category, filterby, keyName) {
    const result = [];
    const map = new Map();
    for (const item of category) {
      if (!map.has(item[filterby].id)) {
        // console.log("item filter by id",item[filterby].id);  // it filtered id 1 & 2 
        map.set(item[filterby].id, true);  
        var tempArray = [];
        tempArray.push(item);
        // console.log("item in temp array",tempArray)
        result.push({
          id: item[filterby].id,
          name: item[filterby][keyName],
          value: tempArray
        });
      } else {
        
        let filterCat = result.find(cat => cat.id === item[filterby].id);
        filterCat.value.push(item);
         // console.log("item pushing in else cdn",item);
      }
    }
    console.log("result array",result);
    return result;
   
  }
  
}
