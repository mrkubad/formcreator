import { FieldType } from "../enums/fieldType";
import FieldEditorDialog from "./fieldEditorDialog";
import IField from "../interfaces/iField";
import LocalStorage from "../storage/localStorage";
import App from "../app";

export default class FormCreator {

    fieldsCreated: IField[] = [];
    readonly _localStorage: LocalStorage;

    constructor(localStorage: LocalStorage) {
        this._localStorage = localStorage;
    }

    newForm(parrent: HTMLElement): void {
        const divButtonHolder: HTMLDivElement = document.createElement("div");
        divButtonHolder.classList.add("div-btn-holder");

        const saveButton = this.createEmptyButton();
        saveButton.classList.add("btn-info", "btn-space-right");
        saveButton.innerText = "Save form";
        saveButton.addEventListener("click", () => {
            this.saveForm();
        });
        divButtonHolder.appendChild(saveButton);


        const closeButton: HTMLButtonElement = this.createEmptyButton();
        closeButton.classList.add("btn-dark", "btn-space-left");
        closeButton.innerText = "Discard";
        closeButton.addEventListener("click", () => {
            App.moveToPage("/index.html");
        });
        divButtonHolder.appendChild(closeButton);

        parrent.appendChild(divButtonHolder);


        const selectTypeDiv: HTMLDivElement = document.createElement("div");
        selectTypeDiv.classList.add("div-btn-holder");
        selectTypeDiv.appendChild(document.createElement("h3")).appendChild(document.createTextNode("Select field type"));


        for(let type in FieldType) {
            const typeButton =  this.createEmptyButton();
            typeButton.classList.add("btn-primary", "btn-field-type");
            typeButton.innerText = type;
            typeButton.dataset.fieldType = type;
            typeButton.addEventListener("click", (e) => {
                this.handleFieldTypeButtonClick(e, selectTypeDiv);
            });
            selectTypeDiv.appendChild(typeButton);
        }


        parrent.appendChild(selectTypeDiv);

    }
    handleFieldTypeButtonClick(e: Event, parrent: HTMLElement): void {
        console.log(parrent);
        const fieldTypeStr: string = (e.target as HTMLButtonElement).dataset.fieldType;
        const fieldType: FieldType = FieldType[fieldTypeStr as keyof typeof FieldType];
        new FieldEditorDialog(fieldType, this.fieldsCreated).render(parrent);
    }
    saveForm(){
        if(this.fieldsCreated.length != 0) {
            this._localStorage.saveForm(this.fieldsCreated);
            console.log(this.fieldsCreated);
            App.moveToPage("/index.html");
        }
        else {
            alert("You can't save empty form :P");
        }
    }
    private createEmptyButton(): HTMLButtonElement {
        const button = document.createElement("button");
        button.type = "button";
        button.classList.add("btn");
        return button;
    }

}