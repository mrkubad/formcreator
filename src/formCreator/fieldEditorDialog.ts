import InputField from "../fields/inputField";
import { FieldType } from "../enums/fieldType";
import EmailField from "../fields/emailField";
import DateField from "../fields/dateField";
import TextAreaField from "../fields/textareaField";
import SelectField from "../fields/selectField";
import CheckboxField from "../fields/checkboxField";
import IField from "../interfaces/iField";

export default class FieldEditorDialog {
    fieldType: FieldType;
    previousContainer: HTMLElement;
    createdFields: IField[];

    constructor(type: FieldType, createdFields?: IField[]) {
        this.fieldType = type;
        this.createdFields = createdFields;
    }
    save(e: Event, name: string, labelText: string, defaultValue: string): void {
        console.log(this.fieldType);

        let newField = undefined;
        switch(this.fieldType){
            case FieldType.Email:
                newField =  new EmailField(name, labelText, defaultValue);
                break;
            case FieldType.Date:
                newField =  new DateField(name, labelText, defaultValue);
                break;
            case FieldType.Checkbox:
                newField =  new CheckboxField(name, labelText, defaultValue);
                break;
            case FieldType.Select: {
                newField =  new SelectField(name, labelText, defaultValue.split(";"));
                break;
            }
            case FieldType.Text: {
                newField =  new InputField(name, labelText, defaultValue);
                break;
            }
            case FieldType.TextArea: {
                newField =  new TextAreaField(name, labelText, defaultValue);
                break;
            }
        }
        this.createdFields.push(newField);
        newField.render(this.previousContainer);
        this.close();
        console.log("whocho");
    }
    close():void {
        document.body = this.previousContainer;
    }

    render(): void {
        const parrentDiv: HTMLDivElement =  document.createElement("div");
        const confirmButton: HTMLButtonElement = document.createElement("button");
        confirmButton.innerText = "Confirm";
       

        const cancelButton: HTMLButtonElement = document.createElement("button");
        cancelButton.innerText = "Cancel";
        cancelButton.addEventListener("click", () => {this.close();})

        const nameInput = new InputField("inputname", "Input name");
        const textLabel = new InputField("labelText", "Input label text");


      
        const fieldDefaultVelue = new InputField("fieldValue", this.fieldType == FieldType.Select ? "; separated options" : "Input default value (leave empty if none)");

        confirmButton.addEventListener("click", (e) => {
            this.save(e, nameInput.getValue(), textLabel.getValue(), fieldDefaultVelue.getValue());
        });

        this.previousContainer = document.body;
        console.log(this.previousContainer);
        document.body = document.createElement("body");

        document.body.appendChild(parrentDiv);

        nameInput.render(parrentDiv);
        textLabel.render(parrentDiv);
        fieldDefaultVelue.render(parrentDiv);

        document.body.appendChild(confirmButton);
        document.body.appendChild(cancelButton);
    }
}