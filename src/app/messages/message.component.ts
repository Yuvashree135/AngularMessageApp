import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Message } from './message.model';
import { MessageService } from './message.service';

@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})

export class MessageComponent {
  @Input('Aliasmessage') message: Message;
  //to pass the event to app component as it cant listen to multiple events
  @Output() editClicked = new EventEmitter<string>();

  constructor(private messageService: MessageService) {}

  editMessage() {
    this.messageService.editMessage(this.message);
  }

  deleteMessage() {
    this.messageService.deleteMessage(this.message)
      .subscribe(
        result => console.log(result)
      );
  }

  belongsToUser() {
    return localStorage.getItem('userId') == this.message.userId;
  }
}
