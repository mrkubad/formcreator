import './main.scss';
import FormCreator from './formCreator/formCreator';

document.addEventListener('DOMContentLoaded', () => {
    let dialog = new FormCreator();
    dialog.newForm(document.body);
});