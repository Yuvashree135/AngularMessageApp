import { Component, OnInit } from '@angular/core';

import { ErrorService } from './error.service';
import { Error } from './error.model';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styles: [`
      .backdrop {
          background-color: rgba(0,0,0,0.6);
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
      }
  `]
})
export class ErrorComponent implements OnInit {
  error: Error;
  display = 'none';

  constructor(public errorService: ErrorService) {}

  ngOnInit() {
    this.errorService.errorOccured.subscribe(
        (error: Error) => {
          console.log('in subscribe');
          this.error = error;
          this.display = 'block';
        }
      );
  }

  onErrorHandle() {
    this.display = 'none';
  }

}
