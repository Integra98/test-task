import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PriceList } from 'src/models';
import { PriceListService } from 'src/services/price-list.service';

@Component({
  selector: 'app-edit-price-list',
  templateUrl: './edit-price-list.component.html',
  styleUrls: ['./edit-price-list.component.css']
})
export class EditPriceListComponent implements OnInit {

  priceLists: PriceList[] = [];
  priceListForEdit: PriceList = {};
  ERPCompanyIds: number[] = [];
  submitted = false;

  form: FormGroup = new FormGroup({
    extErpPriceListID: new FormControl('', [Validators.required, this.checkExtErpPriceListId()]),
    priceListName: new FormControl('', [Validators.required, Validators.minLength(10), Validators.pattern('[a-zA-Z]+$')])
  });

  constructor(private priceListService: PriceListService,
    private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder
    // , private erpLogisticSiteService: erpLogisticSiteService
  ) { }

  ngOnInit(): void {
    this.getPriceListForEdit(this.route.snapshot.params["id"]);
  }

  getPriceListForEdit(id: number) {
    // For test. Just to display actions on the page
    this.priceLists = this.priceListService.getTestPriceList();
    this.priceListForEdit = this.priceLists.find(x => x.priceListID == id)!;
    //


    // For real API.
    // this.priceListService.getPriceLists(this.ERPCompanyIds, '')
    //   .subscribe({
    //     next: (res) => {
    //       if (res) {
    //         this.priceLists = res;
    //         this.priceListForEdit = this.priceLists.find(x => x.priceListID === id)!;
    //       }
    //     },
    //     error: (err) => console.error(err)
    //   });
  }

  updatePriceList() {
    // For test. Just to display actions on the page
    this.priceListService.updateTestPriceList(this.route.snapshot.params["id"], this.priceListForEdit);
    //

    // For real API.
    // this.priceListService.updatePriceList(this.priceListForEdit)
    // .subscribe({
    //       next: (res) => {
    //         if (res) {
    //           alert('Successfully updated!')
    //         }
    //       },
    //       error: (err) => console.error(err)
    //     });

  }

  submit() {
    this.submitted = true;
    if (this.form.invalid) {
      return
    } else {
      this.updatePriceList();
    }
  }

  checkExtErpPriceListId(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value
      const findedPriceList = this.priceLists.find(x => x.priceListID === value);
      return findedPriceList ? { checkedId: { value: value } } : null;
    };
  }


}
