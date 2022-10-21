import { ContactsCollection, Contact } from "./models";

export class ContactsControllerOptions {
  action: "get" | "save";
  params: Contact;
}

class ContactsController {
  contacts: ContactsCollection;
  promesa: Promise<any>;
  constructor() {
    this.contacts = new ContactsCollection();
    const promesa = this.contacts.load();
    this.promesa = promesa;
  }
  processOptions(options: ContactsControllerOptions) {
    var resultado;
    if (options.action == "get" && options.params.id) {
      resultado = this.contacts.getOneById(options.params.id);
    } else if (options.action == "get") {
      resultado = this.contacts.getAll();
    } else if (options.action == "save" && options.params) {
      this.contacts.addOne(options.params);
      const promesa = this.contacts.save();
      resultado = promesa.then((res) => {
        return res;
      });
    }
    return resultado;
  }
}
export { ContactsController };
