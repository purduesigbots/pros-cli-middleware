import { Application, ApplicationArguments } from './application';

export type ModalArguments = ApplicationArguments & {
  title: string,
  confirm_button: string,
  cancel_button: string,
  can_confirm: boolean,
  will_abort: boolean
}

export type ModalConstructor = { new(ModalArguments): Application }

export class Modal extends Application {
  title: string;
  confirm_button: string;
  cancel_button: string;
  can_confirm: boolean;
  will_abort: boolean;

  constructor(args: ModalArguments) {
    super(args);
    const {
      title,
      confirm_button,
      cancel_button,
      can_confirm,
      will_abort
    } = args;
    this.title = title;
    this.confirm_button = confirm_button;
    this.cancel_button = cancel_button;
    this.can_confirm = can_confirm;
    this.will_abort = will_abort;
  }

  refresh(args: ModalArguments) {
    super.refresh(args);
    const {
      title,
      confirm_button,
      cancel_button,
      can_confirm,
      will_abort
    } = args;
    this.title = title;
    this.confirm_button = confirm_button;
    this.cancel_button = cancel_button;
    this.can_confirm = can_confirm;
    this.will_abort = will_abort;
  }
}
