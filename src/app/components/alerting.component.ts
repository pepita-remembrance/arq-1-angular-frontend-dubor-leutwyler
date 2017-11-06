import {FlashMessagesService} from 'angular2-flash-messages';

export abstract class AlertingComponent {
  constructor(private flashMessagesService: FlashMessagesService) {
  }

  alert(text?: string) {
    this.flashMessagesService.show(text, {timeout: 5000, cssClass: 'alert-danger'});
  }

  success(text?: string) {
    this.flashMessagesService.show(text, {timeout: 5000, cssClass: 'alert-success'});
  }

  warning(text?: string) {
    this.flashMessagesService.show(text, {timeout: 5000, cssClass: 'alert-warning'});
  }
}
