import { Component } from '@angular/core';

@Component({
  selector: 'registerFooter',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class RegisterFooter {
  constructor(){
    // var checkboxes = $("input[type='checkbox']");
    // this.disableNextButton$ = new Subject<boolean>(false);
  } 
  ngOnInit() {

    // this.disableNextButton$.subscribe(value => console.log(value));
    // this.disableNextButton$.next(true);
  }

}
