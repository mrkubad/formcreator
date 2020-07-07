import IField from "../interfaces/iField";

export default abstract class FieldBase implements IField {
    name: string;
    label: string;
    type: import("../enums/fieldType").FieldType;
    value: string;
    id: number;
    render: () => void;
    getValue = (): string => this.value;

    protected onFieldChange(e: Event): void {
        const isCheckbox = (e.target as HTMLInputElement).type === "checkbox";
        let previousValue = this.value;
        let currentValue: string =  isCheckbox ? String((e.target as HTMLInputElement).checked) : (e.target as HTMLInputElement).value;
        this.value = currentValue;
        console.log(JSON.stringify(this));
        console.log(`Changed value from(${previousValue}) to (${currentValue})`);
    }

    protected bindEventListener(element: HTMLElement): void {
        element.addEventListener('change', (e) => this.onFieldChange(e));
    }

    protected getRenderContainer(): HTMLElement {
        return document.getElementById("content");
    }
}