import { FieldType } from '../enums/fieldType';
import FieldBase from './fieldBase';

export default class InputField extends FieldBase {

    placeholderText: string;
    hintText: string;

    constructor(name: string, label: string, value: string = "", placeholderText: string = "", hintText: string = "", id: number = 0) {
        super();
        this.name = name;
        this.label = label;
        this.value = value;
        this.id = id;
        this.placeholderText = placeholderText;
        this.hintText = hintText;
    
        this.type = FieldType.Text;
    }

    render = (): void => {
        const placeholderExists: boolean = this.placeholderText.length > 0;
        const hintExists: boolean = this.hintText.length > 0; 

        let parrentDiv: HTMLDivElement = document.createElement("div");
        parrentDiv.classList.add("form-group");
       
        let currentElement: HTMLInputElement = document.createElement("input");
        currentElement.id = this.name + this.id;
        currentElement.classList.add("form-control");
        currentElement.type = this.type;


        let label: HTMLLabelElement = document.createElement("label");
        label.setAttribute("for", currentElement.id);
        label.innerText = this.label;

        parrentDiv.appendChild(label);
        parrentDiv.appendChild(currentElement);

        if(placeholderExists) {
            currentElement.setAttribute("placeholder", this.placeholderText);
        }
        if(hintExists){
            currentElement.setAttribute("aria-describedby", this.name + this.id + "Help");
            let hintElement: HTMLElement = document.createElement("small");
            hintElement.classList.add("form-text", "text-muted");
            hintElement.id = this.name + this.id;
            hintElement.innerText = this.hintText;
            parrentDiv.appendChild(hintElement);
        }

        this.getRenderContainer().appendChild(parrentDiv);
        
        this.bindEventListener(currentElement); // on change, will change value
    }
}