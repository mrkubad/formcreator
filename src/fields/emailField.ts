import { FieldType } from '../enums/fieldType';
import InputField from './inputField';

export default class EmailField extends InputField {

    constructor(name: string, label: string, value: string = "", placeholderText: string = "", hintText: string = "", id: number = 0) {
        super(name, label, value, placeholderText, hintText, id);
        
        this.type = FieldType.Email;
    }
}