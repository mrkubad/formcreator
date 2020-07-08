import IField from './interfaces/iField'
import InputField from './fields/inputField';
import EmailField from './fields/emailField';
import DateField from './fields/dateField';
import SelectField from './fields/selectField';
import CheckboxField from './fields/checkboxField';
import TextAreaField from './fields/textareaField';
import LocalStorage from './storage/localStorage';
import App from './app';
import { FieldType } from './enums/fieldType';


export default class Form {
    fields: IField[];
    isSavedDocument: boolean;
    documentId: string;
    isForm: boolean;


    constructor(documentId?: string, isForm?: boolean) {
        if(documentId){
            this.documentId = documentId;
            this.fields = [];
            this.isSavedDocument = true;
            this.isForm = isForm;
            var local = new LocalStorage();
            var data = isForm ? local.loadForm(documentId) : local.loadDocument(documentId);
            console.log(data);
            for(let obj of data){
                console.log(obj);
                switch((obj as IField).type){
                    case FieldType.Text: {
                        let temp = obj as InputField;
                        this.fields.push(new InputField(temp.name, temp.label, temp.value, temp.placeholderText, temp.hintText, temp.id));
                        break;
                    }
                    case FieldType.Checkbox: {
                        let temp = obj as CheckboxField;
                        this.fields.push(new CheckboxField(temp.name, temp.label, temp.value, temp.id));
                        break;
                    }
                    case FieldType.Date: {
                        let temp = obj as DateField;
                        this.fields.push(new DateField(temp.name, temp.label, temp.value, temp.placeholderText, temp.hintText, temp.id));
                        break;
                    }
                    case FieldType.Email: {
                        let temp = obj as EmailField;
                        this.fields.push(new EmailField(temp.name, temp.label, temp.value, temp.placeholderText, temp.hintText, temp.id));
                        break;
                    }
                    case FieldType.TextArea: {
                        let temp = obj as TextAreaField;
                        this.fields.push(new TextAreaField(temp.name, temp.label, temp.value, temp.id, temp.rowNumber));
                        break;
                    }
                    case FieldType.Select: {
                        let temp = obj as SelectField;
                        this.fields.push(new SelectField(temp.name, temp.label, temp.options, temp.value, temp.id));
                        break;
                    }
                        
                }
            }
            console.log(this.fields);
        }
        else {
            this.isSavedDocument = false;
            this.fields = [
                new InputField('imienazwisko', 'Imię i nazwisko:', '', "Imię i nazwisko", "Podaj swoje imię i nazwisko", 5000),
                new InputField('age', 'Wiek:'),
                new EmailField('email', 'E-mail:'),
                new DateField('start-date', 'Data rozpoczęcia studiów: '),
                new SelectField('studies', 'Typ studiów:', ['niestacjonarne', 'stacjonarne']),
                new CheckboxField('newsletter', 'Czy chcesz uczestniczyć w newsletterze?'),
                new TextAreaField('comments', 'Uwagi:')
            ];
        }
    }


    getValue = () : string[] => {
        let result: string[] = [];

        for(let field of this.fields) {
            result.push(field.getValue());
        }
        return result;
    }

    render = (): void => {

        for(let field of this.fields){
            field.render();
        }

        let saveButton: HTMLButtonElement = document.createElement("button");
        let backButton: HTMLButtonElement = document.createElement("button");

        saveButton.innerText = "Zapisz";
        saveButton.type = "button";
        saveButton.classList.add("btn", "btn-primary");
        saveButton.addEventListener("click", (e) => {this.save(e)})
        backButton.innerText = "Wstecz";
        backButton.type = "button";
        backButton.classList.add("btn", "btn-info");
        backButton.addEventListener("click", (e) => {this.back(e)});

        App.getRenderTarget().appendChild(saveButton);
        App.getRenderTarget().appendChild(backButton);
    }

    save(e: Event):void {
        console.log("Zapisuję");
        const storage: LocalStorage = new LocalStorage();

        if(this.isForm) {
            storage.saveDocument(this.fields);
        }
        else {
            if(this.isSavedDocument) {
                storage.updateDocument(this.documentId, this.fields);
            } else {
                storage.saveDocument(this.fields);
            }
        }
        
        
        App.moveToPage("/index.html");
    }
    back(e: Event): void {
       App.moveToPage("/index.html");
    }
}