import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-result-summary',
  templateUrl: './result-summary.component.html',
  styleUrls: ['./result-summary.component.scss'],
})
export class ResultSummaryComponent implements OnInit {
  public result: any;
  public division: any = ['I', 'II', 'III', 'IV', '0'];
  public sex: any = ['F', 'M'];
  public divSummary: any = [];
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.result = this.config.data;
    this.getDivisionSummary();
  }

  getDivisionSummary() {
    for (let div of this.division) {
      let arr = [];
      for (let sex of this.sex) {
        //get division
        let items = [];
        items = this.result.filter(
          (item: { division: string; gender: any }) =>
            div == item.division.split(' ')[0] && sex == item.gender
        );
        console.log(items);
        arr[sex] = items.length;
      }
      const obj = Object.assign({}, arr);
      this.divSummary[div] = obj;
    }
  }
}
