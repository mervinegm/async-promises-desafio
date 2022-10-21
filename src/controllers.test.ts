import test from "ava";
import { ContactsController } from "./controllers";
import { ContactsControllerOptions } from "./controllers";

test("Testeo el constructor del controller", (t) => {
  const controller = new ContactsController();
  return controller.promesa.then(() => {
    t.truthy([controller.contacts]);
  });
});

test("Testeo el método processOptions del controller", (t) => {
  const controller = new ContactsController();
  return controller.promesa.then(() => {
    var options: ContactsControllerOptions = {
      action: "get",
      params: { id: 1, name: null },
    };
    const getOne = controller.processOptions(options);
    t.deepEqual(getOne, {
      id: 1,
      name: "Ana",
    });

    var options: ContactsControllerOptions = {
      action: "get",
      params: { id: null, name: null },
    };
    const getAll = controller.processOptions(options);
    t.deepEqual(getAll, [
      { id: 1, name: "Ana" },
      { id: 2, name: "Paula" },
      { id: 3, name: "Mer" },
      { id: 4, name: "Dana" },
    ]);

    /* var options: ContactsControllerOptions = {
      action: "save",
      params: { id: 44, name: "Matias" },
    };
    const save = controller.processOptions(options);
    const getAllWithSaved = controller.processOptions({
      action: "get",
      params: { id: null, name: null },
    });
    t.deepEqual(getAllWithSaved, [
      { id: 1, name: "Ana" },
      { id: 2, name: "Paula" },
      { id: 3, name: "Mer" },
      { id: 4, name: "Dana" },
      { id: 44, name: "Matias" },
    ]); */
  });
});
