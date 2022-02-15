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
    // For test
    this.priceLists = this.priceListService.getTestPriceList();
    //
    this.priceListService.getPriceLists(ERPCompanyIds, SearchTerm)
      .subscribe({
        next: (res) => {
          this.priceLists = res;
          console.log(res);
        },
        error: (err) => console.error(err)
      });
  }


  search(): void {
    this.getPriceLists(this.ERPCompanyIds, this.searchText);
  }


}
