import IField from './interfaces/iField'
import LocalStorage from './storage/localStorage';
import App from './app';


export default class Form {
    fields: IField[];
    documentId: string;
    isNewDocument: boolean;
    readonly _localStorage: LocalStorage;


    constructor(localStorage: LocalStorage, documentId: string, newDocument: boolean = false) {
        this.documentId = documentId;
        this._localStorage = localStorage;
        this.fields = this.isNewDocument ? this._localStorage.loadForm(documentId) : this._localStorage.loadDocument(documentId);
        this.isNewDocument = newDocument;
    }


    getValue = () : string[] => {
        let result: string[] = [];

        for(let field of this.fields) {
            result.push(field.getValue());
        }
        return result;
    }

    render = (target: HTMLElement): void => {

        console.log(this.fields);
        for(let field of this.fields){
            field.render(target);
        }

        const saveButton: HTMLButtonElement = document.createElement("button");
        saveButton.innerText = "Save";
        saveButton.type = "button";
        saveButton.classList.add("btn", "btn-primary", "btn-space-right");
        saveButton.addEventListener("click", () => {this.save()})


        const backButton: HTMLButtonElement = document.createElement("button");
        backButton.innerText = "Go Back";
        backButton.type = "button";
        backButton.classList.add("btn", "btn-dark", "btn-space-left");
        backButton.addEventListener("click", () => {this.back()});

        target.appendChild(saveButton);
        target.appendChild(backButton);
    }

    save(): void {
        console.log("Saving...");
        if(this.isNewDocument){
            this._localStorage.saveDocument(this.fields);
        }
        else {
            this._localStorage.updateDocument(this.documentId, this.fields);
        }

        this.back();
    }
    back(): void {
       App.moveToPage("/index.html");
    }
}