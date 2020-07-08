import { FieldType } from '../enums/fieldType';
import FieldBase from './fieldBase';

export default class SelectField extends FieldBase {
    options: string[];

    constructor(name: string, label: string, options: string[] = [], value: string = "", id: number = 0) {
        super();
        this.name = name;
        this.label = label;
        this.value = value;
        this.options = options;
        this.id = id;

        this.type = FieldType.Select;
    }

    render = (parrent?: HTMLElement): void => {
        
        let parrentDiv: HTMLDivElement = document.createElement("div");
        parrentDiv.classList.add("form-group");


        let currentElement: HTMLSelectElement = document.createElement("select");
        currentElement.classList.add("form-control");
        currentElement.id = this.name + this.id;
        let i:number = 0;
        for(let option of this.options){
            let optionElement: HTMLOptionElement = document.createElement("option");
            optionElement.value = option;
            optionElement.innerText = option;
            currentElement.options.add(optionElement);
            if(option === this.value) {
                currentElement.selectedIndex = i;
            }
            i++;
        }

        this.bindEventListener(currentElement);

        let label: HTMLLabelElement = document.createElement("label");
        label.setAttribute("for", currentElement.id);
        label.innerText = this.label;

        parrentDiv.appendChild(label);
        parrentDiv.appendChild(currentElement);

        if(parrent) {
            parrent.appendChild(parrentDiv);
        }
        else {
            this.getRenderContainer().appendChild(parrentDiv);
        }
        
    }
}