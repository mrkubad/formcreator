import './main.scss';
import  DocumentList from './storage/documentList';

document.addEventListener('DOMContentLoaded', () => {
    const docList: DocumentList = new DocumentList();
    docList.render(document.body);
});