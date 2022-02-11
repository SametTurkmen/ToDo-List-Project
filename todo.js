
//Tüm Elementleri Seçme
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListener();

function eventListener() { //Tüm event listenerlar
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI); //Sayfa yüklendiğinde
    secondCardBody.addEventListener("click", deleteTodo);
    filter.addEventListener("keyup", filterTodos);
    clearButton.addEventListener("click", clearAllTodos);

}

function clearAllTodos(e) {

    if (confirm("Tüm Todoları silmek istediğinize emin misiniz?")) {

        while (todoList.firstChild != null) {
            todoList.removeChild(todoList.firstChild);

        }
        localStorage.clear("todos");
    }
}

function filterTodos(e) {

    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(listItem => {
        const text = listItem.textContent.toLowerCase();
        if (text.indexOf(filterValue) === -1) {
            // listItem.style.display = "none !important"; // ?
            listItem.setAttribute("style", "display:none !important");
        }
        else {
            // listItem.style.display= "block"; // ?
            listItem.setAttribute("style", "display:block");
        }

    });

}
function deleteTodo(e) {

    if (e.target.className === "fa fa-remove") {
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success", "todo başarıyla silindi");
    }
}
function deleteTodoFromStorage(deleteTodo) {

    let todos = getTodosFromStorage();

    todos.forEach((todo, index) => {
        if (todo === deleteTodo) {
            todos.splice(index, 1); // arraydan değeri silme
        }
    });

    localStorage.setItem("todos", JSON.stringify(todos));
}

function loadAllTodosToUI(e) {
    let todos = getTodosFromStorage();

    todos.forEach(todo => {
        addTodoToUI(todo);
    });
}

function addTodo(e) {

    const newTodo = todoInput.value.trim();

    if (newTodo === "") {
        showAlert("danger", "Lütfen todo giriniz...");
    }
    else {
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success", "todo başarıyla eklendi");
    }


    e.preventDefault();
}

function getTodosFromStorage() {
    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function addTodoToStorage(newTodo) {
    let todos = getTodosFromStorage();

    todos.push(newTodo);

    localStorage.setItem("todos", JSON.stringify(todos));

}

function showAlert(type, message) {

    const alert = document.createElement("div");

    alert.className = `alert alert-${type}`;
    alert.textContent = message;

    // console.log(alert);
    firstCardBody.appendChild(alert);

    // SetTimeout
    setTimeout(function () {
        alert.remove();
    }, 1000);


}

function addTodoToUI(newTodo) { // String değerini listItem olarak ekleyecek.

    //List Item oluşturma
    const listItem = document.createElement("li");

    // link oluşturma
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>"

    listItem.className = "list-group-item d-flex justify-content-between";

    // Text Node ekleme
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    todoList.appendChild(listItem);

    todoInput.value = "";

}