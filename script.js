const input = document.getElementById("input-element");
const add_edit = document.getElementById("add-edit");
const grocery_grid = document.querySelector(".grocery-grid");
let current_type = "add";
let edit_id = "";
let edit_element;
let current_items = [];
const LOCAL_STORAGE_KEY = "local_storage";
let local_storage_active = false;

const updateLocalStorage = () =>
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(current_items));

const add_Edit_func = () => {
  const value = input.value;
  if (value !== "") {
    if (current_type == "add") {
      addItem(value, window.performance.now());
    } else {
      document.getElementById(edit_id).innerHTML = value;
      edit_element.classList.remove("custom-bg");
      current_type = "add";
      add_edit.innerHTML = "Add Item";
      current_items = current_items.filter((e) => e.id !== parseFloat(edit_id));
      current_items.push({
        content: input.value,
        id: window.performance.now(),
      });
      updateLocalStorage();
    }
  }
  input.value = "";
};

add_edit.addEventListener("click", add_Edit_func);

const addItem = (item, id) => {
  const edit_button = document.createElement("button");
  edit_button.innerHTML = "E";
  edit_button.id = "delete";

  edit_button.addEventListener("click", (event) => {
    const element = event.currentTarget.parentNode.parentNode.childNodes[0];
    edit_id = element.id;
    input.value = element.innerHTML;
    current_type = "edit";
    add_edit.innerHTML = "Edit";
    edit_element = element.parentNode;
    edit_element.classList.add("custom-bg");
  });

  const delete_button = document.createElement("button");
  delete_button.innerHTML = "D";
  delete_button.id = "delete";

  delete_button.addEventListener("click", (event) => {
    event.currentTarget.parentNode.parentNode.remove();

    current_items = current_items.filter(
      (e) =>
        e.id !==
        parseFloat(event.currentTarget.parentNode.parentNode.childNodes[0].id)
    );

    updateLocalStorage();
  });

  const button_grid = document.createElement("div");
  button_grid.className = "button-grid";
  button_grid.append(edit_button, delete_button);

  const input_text = document.createElement("div");
  input_text.className = "item";
  input_text.innerHTML = item;
  input_text.id = id;

  const grocery = document.createElement("div");
  grocery.className = "grocery";

  grocery.append(input_text, button_grid);
  grocery_grid.appendChild(grocery);

  if (local_storage_active) {
    current_items.push({
      id: id,
      content: item,
    });
    updateLocalStorage();
  }
};

current_items = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];

current_items.forEach((element) => {
  addItem(element.content, element.id);
});
local_storage_active = true;
