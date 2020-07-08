import { FieldType } from '../enums/fieldType';
import FieldBase from './fieldBase';

export default class TextAreaField extends FieldBase {
    rowNumber: number;

    constructor(name: string, label: string, value: string = "", id: number = 0, rowNumber: number = 3) {
        super();
        this.name = name;
        this.label = label;
        this.value = value;
        this.id = id;
        this.rowNumber = rowNumber;

        this.type = FieldType.TextArea;
    }

    render = (parrent?: HTMLElement): void  => {

        let parrentDiv: HTMLDivElement = document.createElement("div");
        parrentDiv.classList.add("form-group");

        let currentElement: HTMLTextAreaElement = document.createElement("textarea");
        currentElement.classList.add("form-control");
        currentElement.id = this.name + this.id;
        currentElement.rows = this.rowNumber;
        currentElement.value = this.value;
        
        this.bindEventListener(currentElement);

        let label: HTMLLabelElement = document.createElement("label");
        label.setAttribute("for", currentElement.id);
        label.innerText = this.label;

        parrentDiv.appendChild(label);
        parrentDiv.appendChild(currentElement);

        if(parrent){
            parrent.appendChild(parrentDiv);
        }
        else {
            this.getRenderContainer().appendChild(parrentDiv);
        }
    };
}