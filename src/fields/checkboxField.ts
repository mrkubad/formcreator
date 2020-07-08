import { FieldType } from '../enums/fieldType';
import FieldBase from './fieldBase';

export default class CheckboxField extends FieldBase {

    constructor(name: string, label: string, value: string = "", id : number = 0) {
        super();
        this.name = name;
        this.label = label;
        this.value = value;
        this.id = id;

        this.type = FieldType.Checkbox;
    }

    render = (parrent?: HTMLElement): void => {
        let parrentDiv: HTMLDivElement = document.createElement("div");

        parrentDiv.classList.add("form-check");

        let currentElement: HTMLInputElement = document.createElement("input");
        currentElement.id = this.name + this.id;
        currentElement.classList.add("form-check-input");
        currentElement.type = this.type;
        currentElement.checked = (this.value === "true");
        
        this.bindEventListener(currentElement);

        let label: HTMLElement = document.createElement("label");
        label.setAttribute("for", currentElement.id);
        label.classList.add("form-check-label");
        label.innerText = this.label;

        parrentDiv.appendChild(currentElement);
        parrentDiv.appendChild(label);
        
        if(parrent){
            parrent.appendChild(parrentDiv);
        }
        else {
            this.getRenderContainer().appendChild(parrentDiv);
        }
    }
}