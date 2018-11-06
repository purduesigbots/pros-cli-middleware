import { Application, ApplicationArguments } from './Application';

export type ModalArguments = ApplicationArguments & {
  title: string,
  description?: string,
  confirm_button: string,
  cancel_button: string,
  can_confirm: boolean,
  will_abort: boolean
}

export class Modal extends Application {
  title: string;
  description?: string;
  confirm_button: string;
  cancel_button: string;
  can_confirm: boolean;
  will_abort: boolean;

  constructor(args: ModalArguments) {
    super(args);
    const {
      title,
      description,
      confirm_button,
      cancel_button,
      can_confirm,
      will_abort
    } = args;
    this.title = title;
    this.description = description;
    this.confirm_button = confirm_button;
    this.cancel_button = cancel_button;
    this.can_confirm = can_confirm;
    this.will_abort = will_abort;
  }

  refresh(args: ModalArguments) {
    super.refresh(args);
    const {
      title,
      description,
      confirm_button,
      cancel_button,
      can_confirm,
      will_abort
    } = args;
    this.title = title;
    this.description = description
    this.confirm_button = confirm_button;
    this.cancel_button = cancel_button;
    this.can_confirm = can_confirm;
    this.will_abort = will_abort;
  }

  confirm() {
    console.log(this);
    this._update({
      uuid: this.uuid,
      event: 'confirm'
    })
  }

  cancel() {
    this._update({
      uuid: this.uuid,
      event: 'cancel'
    });

    if(this.will_abort) {
      this.kill();
    }
  }
}
