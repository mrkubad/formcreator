import './main.scss';
import  DocumentList from './storage/documentList';

document.addEventListener('DOMContentLoaded', () => {
    const docList: DocumentList = new DocumentList();
    console.log(docList);
    console.log(localStorage);
    docList.render(document.body);
});