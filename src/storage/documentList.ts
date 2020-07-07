import LocalStorage from "./localStorage";

export default class DocumentList {
    documents: string[];

    constructor() {
        this.getDocumentList();
    }

    private getDocumentList(): void {
        var localStorage = new LocalStorage();
        this.documents = localStorage.getDocuments();
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
        }
        console.log(target);
        target.appendChild(table);

    }
}