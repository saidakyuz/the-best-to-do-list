const myInputTitle = document.getElementById("myInputText");
const myInputBody = document.getElementById("myInputBody");
const myList = document.getElementById("todos");

// const listElement = document.querySelector('.task');

cln.querySelector('.task').innerHTML = create.querySelector('.task').value;
todo.appendChild(cln);

// how to visualize our tasks on html?
// 

class ToDo {
    constructor(topic, text) {
        this._topic = topic;
        this._text = text;
        this._done = false;
        this._deleted = false;
        this._created = new Date();
        this.todos = [];
    }

    set topic(topic) { this._topic = topic; }

    get topic() { return this._topic; }

    set text(text) { this._text = text; }

    get text() { return this._text; }

    setDoneTrue() { this._done = true; }
    setDoneFalse() { this._done = false; }
    get done() { return this._done; }

    setDeleteTrue() { this._delete = true; }
    setDeleteFalse() { this._delete = false; }
    get delete() { return this._delete; }
}

class List {
    constructor() {
        this._toDos = [];
        this._current = null;
        this._date = new Date();
    }

    set toDo(toDo) {
        this._toDos.push(toDo);
    }

    get toDo() {
        return this._toDos;
    }

    setCurrentTrue() { this._current = true; }
    setCurrentFalse() { this._current = false; }
    get current() { return this._current; }
}