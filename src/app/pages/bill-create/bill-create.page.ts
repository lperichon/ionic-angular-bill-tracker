import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BillService } from '../../services/bill.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bill-create',
  templateUrl: './bill-create.page.html',
  styleUrls: ['./bill-create.page.scss']
})
export class BillCreatePage implements OnInit {
  public newBillForm: FormGroup;

  constructor(
    public router: Router,
    formBuilder: FormBuilder,
    public billService: BillService
  ) {
    this.newBillForm = formBuilder.group({
      name: ['', Validators.required],
      amount: ['', Validators.required],
      dueDate: ['', Validators.required]
    });
  }

  ngOnInit() {}

  createBill(newBillForm) {
    this.billService
      .createBill(
        newBillForm.value.name,
        newBillForm.value.amount,
        newBillForm.value.dueDate
      )
      .then(
        () => {
          this.router.navigateByUrl('/home');
        },
        error => {
          console.log(error);
        }
      );
  }
}
