import { Options } from './model/Options';

export class DialogOptions {

    static dialogOptions: Options;

    static getOptions(data) {
        if (window.screen.width <= 570) {
            this.dialogOptions = new Options('100%', { bottom: '0' }, '82vh', data)
        } else {
            this.dialogOptions = new Options('40%', { right: '0' }, '100vh', data)
        }
        return this.dialogOptions
    }

}