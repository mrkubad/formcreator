import IDataStorage from '../interfaces/iDataStorage';

export default class LocalStorage implements IDataStorage {
    saveDocument(document: any): string {
        const fileName: string = `document-${Date.now().toString()}`;
        localStorage.setItem(fileName, JSON.stringify(document));
        return fileName;
    }
    updateDocument(id: string, document: any): void {
        localStorage.removeItem(id);
        localStorage.setItem(id, JSON.stringify(document));
    }
    loadDocument(id: string): Object[]{
        return JSON.parse(localStorage.getItem(id));
    }
    getDocuments(): string[] {
        return Object.keys(localStorage).filter(s => s.includes("document"));
    }
    removeDocument(id: string): void {
        localStorage.removeItem(id);
    }
    getForms(): string[] {
        return Object.keys(localStorage).filter(s => s.includes("form"));
    }
    saveForm(form: any): string {
        const fileName: string = `form-${Date.now().toString()}`;
        localStorage.setItem(fileName, JSON.stringify(form));
        return fileName;
    }
    loadForm(id: string): Object[] {
        return this.loadDocument(id);
    }
    updateForm(id: string, form: any): void {
        return this.updateDocument(id, form);
    }
}