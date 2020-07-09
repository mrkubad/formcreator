import InputField from "../fields/inputField";
import { FieldType } from "../enums/fieldType";
import EmailField from "../fields/emailField";
import DateField from "../fields/dateField";
import TextAreaField from "../fields/textareaField";
import SelectField from "../fields/selectField";
import CheckboxField from "../fields/checkboxField";
import IField from "../interfaces/iField";
import App from "../app";

export default class FieldEditorDialog {
    fieldType: FieldType;
    previousTargetChilds: Node[];
    currentContainer: HTMLElement;
    createdFields: IField[];

    constructor(type: FieldType, createdFields?: IField[]) {
        this.previousTargetChilds = [];
        this.fieldType = type;
        this.createdFields = createdFields;
    }
    save(e: Event, name: string, labelText: string, defaultValue: string): void {
       
        let newField: IField = null;
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
        newField.render(App.getRenderTarget());
        this.close();
        console.log(`Created field of type ${newField.type}`);
    }
    close():void {
        // clean and restore old childs
        this.currentContainer.innerHTML = "";
        for(const child of this.previousTargetChilds) {
            this.currentContainer.appendChild(child);
        }
    }
    private cleanAndSaveTargetContent(target: HTMLElement): void {
        while(target.firstChild) {
            this.previousTargetChilds.push(target.removeChild(target.firstChild));
        }
    } 

    render(parrent: HTMLElement): void {
        this.currentContainer = parrent;
        this.cleanAndSaveTargetContent(parrent);

        const confirmButton = this.createEmptyButton();
        confirmButton.classList.add("btn-info", "btn-space-right");
        confirmButton.innerText = "Confirm";
        this.currentContainer.appendChild(confirmButton);

        const closeButton = this.createEmptyButton();
        closeButton.classList.add("btn-dark", "btn-space-left");
        closeButton.innerText = "Cancel";
        closeButton.addEventListener("click", () => {this.close()});
        this.currentContainer.appendChild(closeButton);


        const nameInput = new InputField("inputname", "Field name: ");
        const textLabel = new InputField("labeltext", "Label text: ");

        const defaultValue = new InputField("defaultValue", this.fieldType == FieldType.Select ? "Options(separated with \";\"):" : this.fieldType == FieldType.Checkbox ? "Input default state(\"true\" or \"false\"):" : "Input default value (leave empty if none)", "", this.fieldType == FieldType.Date ? "YYYY-MM-DD" : "");
        

        confirmButton.addEventListener("click", (e) => {
            this.save(e, nameInput.getValue(), textLabel.getValue(), defaultValue.getValue());
        });

        nameInput.render(this.currentContainer);
        textLabel.render(this.currentContainer);
        defaultValue.render(this.currentContainer);
    }

    private createEmptyButton(): HTMLButtonElement {
        const button = document.createElement("button");
        button.type = "button";
        button.classList.add("btn");
        return button;
    }
}