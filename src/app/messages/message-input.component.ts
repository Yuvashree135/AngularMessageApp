import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

import { MessageService } from "./message.service";
import { Message } from './message.model'

@Component({
  selector: 'message-input',
  templateUrl: './message-input.component.html'
})

export class MessageInputComponent implements OnInit{

  message: Message;
  button: string = 'Add Message';

  constructor(private messageService: MessageService) { }

  onSubmit(form: NgForm) {
    if (this.message) {
      //Edit
      this.message.content = form.value.content;
      this.messageService.updateMessage(this.message).subscribe(
        data => console.log(data)
      )
      this.message = null;
      this.button = 'Add Message';
    } else {
      //Create
      const message = new Message(form.value.content, 'Yuva');
      // on success data
      // on error
      // once call is completed we can add a function here
      this.messageService.addMessage(message).subscribe(
          data => console.log(data),
          error => console.error(error),
        );
      }
    form.resetForm();
  }

  onClear(form: NgForm) {
    this.message = null;
    this.button = 'Add Message';
    form.resetForm();
  }

  ngOnInit() {
    // this will help if editMessage is emitted
    this.messageService.messageEditable.subscribe(
      (message: Message) => {
        this.message = message;
        this.button = 'Edit Message';
      }
    );
  }
}
