import { Component, OnInit } from '@angular/core';
import { PriceList } from 'src/models';
import { PriceListService } from 'src/services/price-list.service';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.css']
})
export class PriceListComponent implements OnInit {
  priceLists: PriceList[] = [];
  searchText='';
  ERPCompanyIds: number[] = [];


  constructor(private priceListService: PriceListService
    // , private erpLogisticSiteService: erpLogisticSiteService
    ) { }

  ngOnInit(): void {
    // get ERPCompanyIds
    // this.ERPCompanyIds = this.erpLogisticSiteService.getErps(); 
    // this.erpLogisticSiteService.erpChangeEvent()
    //   .subscribe(event => this.getPriceLists(event, this.searchText));

    this.getPriceLists(this.ERPCompanyIds, this.searchText);
  }

  getPriceLists(ERPCompanyIds: number [], SearchTerm: string){
    // For test. Just to display actions on the page
    this.priceLists = this.priceListService.getTestPriceList(SearchTerm);
    //
    
    // For real API.
    // this.priceListService.getPriceLists(ERPCompanyIds, SearchTerm)
    //   .subscribe({
    //     next: (res) => {
    //       this.priceLists = res;
    //     },
    //     error: (err) => console.error(err)
    //   });
  }


}
