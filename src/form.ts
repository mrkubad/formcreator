import IField from './interfaces/iField'
import InputField from './fields/inputField';
import EmailField from './fields/emailField';
import DateField from './fields/dateField';
import SelectField from './fields/selectField';
import CheckboxField from './fields/checkboxField';
import TextAreaField from './fields/textareaField';


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
    }
}