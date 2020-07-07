export default interface IDataStorage {
    saveDocument: (document: any) => string;
    loadDocument: (id: string) => Object;
    getDocuments: () => string[];
}