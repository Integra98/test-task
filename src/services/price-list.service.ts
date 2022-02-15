import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PriceList } from 'src/models';

@Injectable({
  providedIn: 'root'
})
export class PriceListService {
// For test
  priceLists: PriceList[] = [
    {extErpPriceListID: 12, priceListID: 1, priceListName: 'priceListOne'},
    {extErpPriceListID: 23, priceListID: 2, priceListName: 'priceListTwo'},
    {extErpPriceListID: 34, priceListID: 3, priceListName: 'priceListThree'},
    {extErpPriceListID: 45, priceListID: 4, priceListName: 'priceListFour'},
    {extErpPriceListID: 56, priceListID: 5, priceListName: 'priceListFive'}
  ];
  //

  constructor(private http: HttpClient) { }
// For test. Just to display actions on the page
  getTestPriceList(){
    return this.priceLists;
  }

  updateTestPriceList(idForUpdate: number, priceListForUpdate: PriceList){
    const index = this.priceLists.findIndex(x => x.priceListID == idForUpdate);
    this.priceLists[index] = priceListForUpdate;
    alert('Successfully updated!')
    
  }
//
  getPriceLists(ERPCompanyIds: number [], SearchTerm: string): Observable<any>{
    return this.http.get('url', {params: {ERPCompanyIds, SearchTerm}});
  } 

  updatePriceList(priceList: PriceList): Observable<any>{
    return this.http.post('url', priceList);
  }
}
