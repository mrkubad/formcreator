import Form from './form';

export default class App {
    static generateForm = () : void => {
         let generatedForm = new Form();
         generatedForm.render();
    }
    static getRenderTarget(): HTMLElement {
        return document.getElementById("content");
    }
    static moveToPage(subpage: string){
        var index: number = location.href.lastIndexOf('/');
        var baseAddress = location.href.substring(0, index);
        location.href = (baseAddress + subpage);
    }
}