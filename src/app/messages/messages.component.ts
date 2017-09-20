import {
  Component
} from "@angular/core";

@Component({
  selector: 'app-messages',
  template: `
  <div class="row">
      <message-input></message-input>
    </div>
    <br/>
    <div class="row">
      <app-message-list></app-message-list>
    </div>
  `
})

export class MessagesComponent {

}
