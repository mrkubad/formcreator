import IDataStorage from '../interfaces/iDataStorage';

export default class LocalStorage implements IDataStorage {
    saveDocument(document: any): string {
        const fileName: string = `document-${Date.now().toString()}`;
        localStorage.setItem(fileName, JSON.stringify(document));
        return fileName;
    }
    loadDocument(id: string): Object {
        return JSON.parse(localStorage.getItem(id));
    }
    getDocuments(): string[] {
        return Object.keys(localStorage);
    }
}