

export class DialogOptions {

    static dialogOptions: Options;

    static getOptions(data) {
        if (window.screen.width <= 570) {
            this.dialogOptions = { minWidth: '100vh', position: { bottom: '0' }, height: '82vh', data: data }
        } else {
            this.dialogOptions = { minWidth: '40%', position: { right: '0' }, height: '100vh', data: data }
        }
        return this.dialogOptions
    }

    static getConfirmDialogOption(){
        if (window.screen.width <= 570) {
            this.dialogOptions = { minWidth: '100vh', position: { bottom: '0' }, height: '50vh' }
        } else {
            this.dialogOptions = { minWidth: '30%', position: { center: '0' }, height: 'auto' }
        }
        return this.dialogOptions
    }

}