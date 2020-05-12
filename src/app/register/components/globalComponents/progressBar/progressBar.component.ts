import { Component } from '@angular/core';

@Component({
  selector: 'progressBar',
  templateUrl: './progressBar.component.html',
  styleUrls: ['./progressBar.component.scss']
})
export class ProgressBar {
  constructor(){
    
    // var checkboxes = $("input[type='checkbox']");
    // this.disableNextButton$ = new Subject<boolean>(false);
  } 
  ngOnInit() {

    // this.disableNextButton$.subscribe(value => console.log(value));
    // this.disableNextButton$.next(true);
  }

}
