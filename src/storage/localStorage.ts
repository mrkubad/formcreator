import IDataStorage from '../interfaces/iDataStorage';
import IField from '../interfaces/iField';
import { FieldType } from '../enums/fieldType';
import CheckboxField from '../fields/checkboxField';
import EmailField from '../fields/emailField';
import DateField from '../fields/dateField';
import SelectField from '../fields/selectField';
import InputField from '../fields/inputField';
import TextAreaField from '../fields/textareaField';

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
    loadDocument(id: string): IField[]{
        return this.deserializeObjects(JSON.parse(localStorage.getItem(id)));
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
    loadForm(id: string): IField[] {
        return this.loadDocument(id);
    }
    updateForm(id: string, form: any): void {
        return this.updateDocument(id, form);
    }

    private deserializeObjects(jsonObjects: Object[]): IField[] {
        const result: IField[] = [];

        for(const jsonObject of jsonObjects) {
            result.push(this.createRealObjectFromJsonObject(jsonObject));
        }
        return result;
    }

    private createRealObjectFromJsonObject(jsonObject: Object): IField {
        let result: IField = null;
        switch((jsonObject as IField).type) {
            case FieldType.Checkbox:
                result = new CheckboxField((<CheckboxField>jsonObject).name, (<CheckboxField>jsonObject).label, (<CheckboxField>jsonObject).value, (<CheckboxField>jsonObject).id);
                break;
            case FieldType.Email:
                result = new EmailField((<EmailField>jsonObject).name, (<EmailField>jsonObject).label, (<EmailField>jsonObject).value, (<EmailField>jsonObject).placeholderText, (<EmailField>jsonObject).hintText, (<EmailField>jsonObject).id);
                break;
            case FieldType.Date:
                result = new DateField((<DateField>jsonObject).name, (<DateField>jsonObject).label, (<DateField>jsonObject).value, (<DateField>jsonObject).placeholderText, (<DateField>jsonObject).hintText, (<DateField>jsonObject).id);
                break;
            case FieldType.Select:
                result = new SelectField((<SelectField>jsonObject).name,(<SelectField>jsonObject).label,(<SelectField>jsonObject).options, (<SelectField>jsonObject).value, (<SelectField>jsonObject).id);
                break;
            case FieldType.Text:
                result = new InputField((<InputField>jsonObject).name, (<InputField>jsonObject).label, (<InputField>jsonObject).value, (<InputField>jsonObject).placeholderText, (<InputField>jsonObject).hintText, (<InputField>jsonObject).id);
                break;
            case FieldType.TextArea:
                result = new TextAreaField((<TextAreaField>jsonObject).name, (<TextAreaField>jsonObject).label, (<TextAreaField>jsonObject).value, (<TextAreaField>jsonObject).id, (<TextAreaField>jsonObject).rowNumber);
                break;
        }
        return result;
    }
}