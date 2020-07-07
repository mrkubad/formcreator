import IField from './interfaces/iField'
import InputField from './fields/inputField';
import EmailField from './fields/emailField';
import DateField from './fields/dateField';
import SelectField from './fields/selectField';
import CheckboxField from './fields/checkboxField';
import TextAreaField from './fields/textareaField';
import LocalStorage from './storage/localStorage';
import App from './app';


export default class Form {
    fields: IField[];


    constructor() {
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
        storage.saveDocument(this);
        
        App.moveToPage("/index.html");
    }
    back(e: Event): void {
       App.moveToPage("/index.html");
    }
}