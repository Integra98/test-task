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
    extErpPriceListID: new FormControl('', [Validators.required, this.checkExtErpPriceListId('extErpPriceListID')]),
    priceListName: new FormControl('', [Validators.required, Validators.minLength(10), Validators.pattern('[a-zA-Z]+$')] )
  });

  constructor(private priceListService: PriceListService,
    private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder
    // , private erpLogisticSiteService: erpLogisticSiteService
  ) { }

  ngOnInit(): void {
    this.getPriceListForEdit(this.route.snapshot.params["id"]);

    // this.form = this.formBuilder.group(
    //   {
    //     extErpPriceListID: ['',
    //       Validators.required,
    //       // checkExtErpPriceListId
    //     ],
    //     priceListName: ['',
    //       Validators.required,
    //       // Validators.minLength(10),
    //       // Validators.pattern('/[0-9]/'),
    //       // Validators.pattern('/[^a-zA-Z0-9 ]/g')
    //     ]
    //   });
  }

  getPriceListForEdit(id: number) {
    // For test
    this.priceLists = this.priceListService.getTestPriceList();
    this.priceListForEdit = this.priceLists.find(x => x.priceListID == id)!;
    //

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
    alert('Successfully updated!')

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

  checkExtErpPriceListId(controlName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value
      const findedPriceList = this.priceLists.find(x => x.priceListID === value);
      return findedPriceList ? {checkedId: {value: value}} : null;
    };
  }


}
