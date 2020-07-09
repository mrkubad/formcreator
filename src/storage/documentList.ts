import LocalStorage from "./localStorage";
import App from "../app";

export default class DocumentList {
    documents: string[];
    isForm: boolean;
    readonly _localStorage: LocalStorage;

    constructor(localStorage: LocalStorage, isForm: boolean = false) {
        this.isForm = isForm;
        this._localStorage = localStorage;
        this.documents = this.getDocuments();
        // if(isForm) {
        //     this.getFromList();
        // }
        // else {
        //     this.getDocumentList();
        // }
    }
    private getDocuments(): string[] {
        return this.isForm ? this._localStorage.getForms() : this._localStorage.getDocuments();
    }
    // private getDocumentList(): void {
    //     var localStorage = new LocalStorage();
    //     this.documents = localStorage.getDocuments();
    // }
    // private getFromList(): void {
    //     let localStorage = new LocalStorage();
    //     this.documents = localStorage.getForms();
    // }

    render(target: HTMLElement): void {
        const table: HTMLTableElement = document.createElement("table");
        table.classList.add("table", "table-dark");

        const header = table.createTHead();
        header.classList.add("thead-light");
        const headerRow = header.insertRow();
        headerRow.appendChild(document.createElement("th")).appendChild(document.createTextNode("#"));
        headerRow.appendChild(document.createElement("th")).appendChild(document.createTextNode("Form Name"));
        headerRow.appendChild(document.createElement("th")).appendChild(document.createTextNode("Controls"));
       
        const tableBody: HTMLTableSectionElement = table.createTBody();
        
        let index: number = 1;
        for(let doc of this.documents) {
            const newRow: HTMLTableRowElement = tableBody.insertRow();
            newRow.insertCell().innerHTML = index.toString(); // insert index
            newRow.insertCell().innerHTML = doc; // insert document name as second column

            const thirdCell: HTMLTableDataCellElement = newRow.insertCell(); // third column

            const firstButton = this.createEmptyButton(doc);
            firstButton.classList.add(this.isForm ? "btn-success" : "btn-info", "btn-space-right");
            firstButton.innerText = this.isForm ? "Fill form" : "Edit document";
            firstButton.addEventListener("click", (e) => {
                const parameter = "?id=" + (e.target as HTMLElement).dataset.documentId;
                App.moveToPage((this.isForm ? "/new-document.html" : "/edit-document.html") + parameter);
            });

            const secondButton = this.createEmptyButton(doc);
            secondButton.classList.add("btn-danger", "btn-space-left");
            secondButton.innerText = "Remove";
            secondButton.addEventListener("click", (e) => {
                this._localStorage.removeDocument((e.target as HTMLElement).dataset.documentId);
                location.reload(); // refresh page after
            });

            thirdCell.appendChild(firstButton);
            thirdCell.appendChild(secondButton);

            index++;
            //if(this.isForm) {
                //firstButton.classList.add("btn-info");
                //firstButton.innerHTML
            //}


            // if(!this.isForm) {
            //     const editButton: HTMLButtonElement = this.createButton("Edit", "btn-primary", doc);
            //     editButton.addEventListener("click", (e) => {
            //         App.moveToPage("/edit-document.html?id=" + (e.target as HTMLElement).dataset.documentId );
            //     });
               
            //     console.log("Nieform, wchodzi");
                
            //     newCell2.appendChild(editButton);
                
            // }
            // else {
            //     const fillButton: HTMLButtonElement = this.createButton("Fill form", "btn-secondary", doc);
            //     fillButton.addEventListener("click", (e) => {
            //         App.moveToPage("/new-document.html?id=" + (e.target as HTMLElement).dataset.documentId);
            //     });
            //     console.log("form wchodzi!!!");
            //     //let newCell2: HTMLTableDataCellElement = newRow.insertCell();
            //     newCell2.appendChild(fillButton);
            // }
            // const deleteButton: HTMLButtonElement = this.createButton("Remove", "btn-secondary", doc);
            // deleteButton.addEventListener("click", (e) => {
            //     const local = new LocalStorage();
            //     local.removeDocument((e.target as HTMLElement).dataset.documentId);
            //     location.reload();
            // });
            // newCell2.appendChild(deleteButton);
            
        }
        target.appendChild(table);
        const goBackButton: HTMLButtonElement = this.createEmptyButton("");
        goBackButton.classList.add("btn-dark");
        goBackButton.innerText = "Go Back";
        goBackButton.addEventListener("click", (e) => {
            App.moveToPage("/index.html");
        });
        target.appendChild(goBackButton);

    }

    // private createButton(label: string, className: string, documentId?: string): HTMLButtonElement {
    //     var button: HTMLButtonElement = document.createElement("button");
    //     button.classList.add("btn", className);
    //     button.type = "button";
    //     button.innerText = label;
    //     if(documentId) {
    //         button.dataset.documentId = documentId;
    //     }

    //     return button;
    // }
    private createEmptyButton(documentId: string): HTMLButtonElement {
        const button = document.createElement("button");
        button.type = "button";
        button.dataset.documentId = documentId;
        button.classList.add("btn");
        return button;
    }
}