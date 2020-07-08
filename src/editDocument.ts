import './main.scss';
import Router from './router/router';
import Form from './form';

document.addEventListener('DOMContentLoaded', () => {
    const docId: string =  Router.getParam('id');
    const form = new Form(docId);
    form.render();
});