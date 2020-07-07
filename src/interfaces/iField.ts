import { FieldType } from '../enums/fieldType';

export default interface IField {
	name: string;
	label: string;
	type: FieldType;
	value: string;
	id: number;
	render: () => void;
	getValue: () => string;
};