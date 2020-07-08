import { FieldType } from "../enums/fieldType";
import FieldEditorDialog from "./fieldEditorDialog";
import IField from "../interfaces/iField";
import LocalStorage from "../storage/localStorage";
import App from "../app";

export default class FormCreator {

    fieldsCreated: IField[] = [];

    newForm(parrent: HTMLElement): void {
        const divWithButtons: HTMLDivElement = document.createElement("div");
        const saveButton: HTMLButtonElement =document.createElement("button");
        saveButton.innerText = "Save";
        saveButton.addEventListener("click", () => {
            this.saveForm();
        });
        divWithButtons.appendChild(saveButton);
        const closeButton: HTMLButtonElement = document.createElement("button");
        closeButton.innerText = "Close";
        closeButton.addEventListener("click", (e) => {
            App.moveToPage("/index.html");
        });
        divWithButtons.appendChild(closeButton);
        parrent.appendChild(divWithButtons);

        const parrentDiv = document.createElement("div");
        for(let type in FieldType) {
            let newButton =  document.createElement("button");
            newButton.innerText = type;
            newButton.dataset.fieldType = type;
            newButton.addEventListener("click", (e) => {
                const data = (e.target as HTMLButtonElement).dataset.fieldType;
                console.log(data);
              var dialogEditor = new FieldEditorDialog(FieldType[data as keyof typeof FieldType], this.fieldsCreated);
              console.log("Głupoty", this.fieldsCreated);
              dialogEditor.render();
            });
            parrentDiv.appendChild(newButton);
        }


        parrent.appendChild(parrentDiv);

    }

    saveForm(){
        const local = new LocalStorage();
        local.saveForm(this.fieldsCreated);
        console.log(this.fieldsCreated);
    }

}