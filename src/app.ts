import Form from './form';

export default class App {
    static generateForm = () : void => {
         let generatedForm = new Form();
         generatedForm.render();
    }
}