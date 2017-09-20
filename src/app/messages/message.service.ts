import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
// its an observable 3rd party lib
// to unlock the operators like map()
import 'rxjs/Rx';
import { Observable } from 'rxjs';

import { Message } from "./message.model";

@Injectable()
export class MessageService {
  private messages: Message[] = []
  messageEditable = new EventEmitter<Message>();

  constructor(private http: Http) { }

  addMessage(message: Message) {
    const bodyMessage = JSON.stringify(message);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.post('http://localhost:4200/message/save', bodyMessage, {headers: headers})
      .map((response: Response) => {
        const result = response.json();
        const message = new Message(result.obj.content, 'Dummy', result.obj._id, null);
        this.messages.push(message);
        return message;
      })
      .catch((error: Response) => Observable.throw(error.json()))
  }

  getMessages() {
    return this.http.get('http://localhost:4200/message/getall')
      .map((response: Response) => {
        const messages = response.json().obj;
        let messageArray: Message[] = [];
        for (let message of messages) {
          messageArray.push(new Message(message.content, 'Dummy', message._id, null))
        }
        this.messages = messageArray;
        return messageArray;
      })
      .catch((error:Response) => Observable.throw(error.json()))
  }

  editMessage(message: Message) {
    this.messageEditable.emit(message);
  }

  updateMessage(message: Message) {
    const body = JSON.stringify(message);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.patch('http://localhost:4200/message/editmessage/' + message.messageId, body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

  deleteMessage(message: Message) {
    this.messages.splice(this.messages.indexOf(message),1);
    return this.http.delete('http://localhost:4200/message/deletemessage/' + message.messageId)
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }
}






// obeservable: it wont send the request. It will set an observable obj which holds the req and has the res
// req will be sent only when we subscribe which is done in the component which calls this method
// map() helps to transform the data sent as res
// .json() to extract the data that is attached to the res and it is a js obj
// map for success case and catch for error case
// map method automatically converts the res obj to Observable obj while we do it manually for catch
