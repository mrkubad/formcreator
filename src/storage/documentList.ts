import LocalStorage from "./localStorage";
import App from "../app";

export default class DocumentList {
    documents: string[];
    isForm: boolean;

    constructor(form: boolean = false) {
        this.isForm = form;
        if(form) {
            this.getFromList();
        }
        else {
            this.getDocumentList();
        }
    }

    private getDocumentList(): void {
        var localStorage = new LocalStorage();
        this.documents = localStorage.getDocuments();
    }
    private getFromList(): void {
        let localStorage = new LocalStorage();
        this.documents = localStorage.getForms();
    }

    render(target: HTMLElement): void {
        var table: HTMLTableElement = document.createElement("table");
        table.classList.add("table");
        var tbody: HTMLTableSectionElement = document.createElement("tbody");
        table.appendChild(tbody);

        for(let doc of this.documents){
            var newRow: HTMLTableRowElement = tbody.insertRow();
            var newCell: HTMLTableDataCellElement = newRow.insertCell();
            newCell.innerText = doc;
           
            const newCell2: HTMLTableDataCellElement = newRow.insertCell();
            if(!this.isForm) {
                const editButton: HTMLButtonElement = this.createButton("Edit", "btn-primary", doc);
                editButton.addEventListener("click", (e) => {
                    App.moveToPage("/edit-document.html?id=" + (e.target as HTMLElement).dataset.documentId );
                });
               
                console.log("Nieform, wchodzi");
                
                newCell2.appendChild(editButton);
                
            }
            else {
                const fillButton: HTMLButtonElement = this.createButton("Fill form", "btn-secondary", doc);
                fillButton.addEventListener("click", (e) => {
                    App.moveToPage("/new-document.html?id=" + (e.target as HTMLElement).dataset.documentId);
                });
                console.log("form wchodzi!!!");
                //let newCell2: HTMLTableDataCellElement = newRow.insertCell();
                newCell2.appendChild(fillButton);
            }
            const deleteButton: HTMLButtonElement = this.createButton("Remove", "btn-secondary", doc);
            deleteButton.addEventListener("click", (e) => {
                const local = new LocalStorage();
                local.removeDocument((e.target as HTMLElement).dataset.documentId);
                location.reload();
            });
            newCell2.appendChild(deleteButton);

        }
        target.appendChild(table);
        const goBackButton: HTMLButtonElement = this.createButton("Go Back", "btn-dark");
        goBackButton.addEventListener("click", (e) => {
            App.moveToPage("/index.html");
        });
        target.appendChild(goBackButton);

    }

    private createButton(label: string, className: string, documentId?: string): HTMLButtonElement {
        var button: HTMLButtonElement = document.createElement("button");
        button.classList.add("btn", className);
        button.type = "button";
        button.innerText = label;
        if(documentId) {
            button.dataset.documentId = documentId;
        }

        return button;
    }
}