import Form from './form';
import './main.scss';
import DocumentList from './storage/documentList';
import LocalStorage from './storage/localStorage';
import Router from './router/router';
import FormCreator from './formCreator/formCreator';

export default class App {
    static getRenderTarget(): HTMLElement {
        return document.getElementById("content");
    }
    static moveToPage(subpage: string){
        var index: number = location.href.lastIndexOf('/');
        var baseAddress = location.href.substring(0, index);
        location.href = (baseAddress + subpage);
    }
}

document.addEventListener("DOMContentLoaded", (e) => {
    console.log(e);
     let currentBody = <HTMLBodyElement>document.getElementsByTagName("body")[0];
    if(currentBody.dataset.title == "formlist") {
        new DocumentList(new LocalStorage(), true).render(App.getRenderTarget());
    }
    else if (currentBody.dataset.title == "documentlist") {
        new DocumentList(new LocalStorage()).render(App.getRenderTarget());
    }
    else if (currentBody.dataset.title == "editdocument") {
        const docId: string =  Router.getParam('id');
        new Form(new LocalStorage(), docId).render(App.getRenderTarget());
    }
    else if (currentBody.dataset.title == "newdocument") {
        const docId: string =  Router.getParam('id');
        new Form(new LocalStorage(), docId, true).render(App.getRenderTarget());
    }
    else if (currentBody.dataset.title == "newform") {
        new FormCreator(new LocalStorage()).newForm(App.getRenderTarget());
    }
});