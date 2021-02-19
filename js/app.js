class ToDo{
  constructor(topic, text){
    this._topic = topic;
    this._text = text;
    this._done = false;
    this._deleted = false;
    this._created = new Date();
  }

  set topic(topic){this._topic = topic;}
  get topic(){return this._topic;}

  set text(text){this._text = text;}
  get text(){return this._text;}

  setDoneTrue(){this._done = true;}
  setDoneFalse(){this._done = false;}
  get done(){return this._done;}

  setDeleteTrue(){this._delete = true;}
  setDeleteFalse(){this._delete = false;}
  get delete(){return this._delete;}
}



class List extends ToDo{
  constructor(){
    super();
    this._toDos = [];
    this._current = null;
    this.htmlCollection = [];
    this._date = new Date();
    this._storage = localStorage;
  }

  set toDo(toDo){
    this._toDos.push(toDo);
  }

  get toDo(){
    return this._toDos;
  }

  selectToDo(e, toDo){
    document.querySelector('#details').innerHTML = toDo._text;
  }

    updating = (e, toDo) => {
      e.preventDefault();

      var topic = e.target.querySelector('#topic');
      var text = e.target.querySelector('#text');
      topic.classList.remove('border', 'border-danger')
      text.classList.remove('border', 'border-danger')
      if(topic.value === ""){
        topic.classList.add('border', 'border-danger', 'border-3')
      }

      if(text.value === ""){
        text.classList.add('border', 'border-danger', 'border-3')
      }

      if(topic.value != "" && text.value != ""){
        toDo.topic = topic.value;
        toDo.text = text.value;

        this.output()
        topic.value = "";
        text.value = "";
      }


    }
  adding = (e) => {
    e.preventDefault();
    var topic = e.target.querySelector('#topic');
    var text = e.target.querySelector('#text');
    topic.classList.remove('border', 'border-danger')
    text.classList.remove('border', 'border-danger')
    if(topic.value === ""){
      topic.classList.add('border', 'border-danger', 'border-3')
    }

    if(text.value === ""){
      text.classList.add('border', 'border-danger', 'border-3')
    }

      if(topic.value != "" && text.value != ""){
      var todo = new ToDo(topic.value, text.value);

      this.toDo = todo;
      this.output()
      topic.value = "";
      text.value = "";
    }
  }

  delete(e, toDo){
    toDo._deleted = true;
    this.output()
    document.querySelector('#details').innerHTML = `<img class="w-100" src="/HappyDog.jpg" alt="stressed dog">`;
  }

  done(e, toDo){
    if(toDo._done === false){
      toDo._done = true;
      e.target.innerHTML = 'UNDO'
      document.querySelector('#details').innerHTML = `<img class="w-100" src="/HappyDog.jpg" alt="stressed dog">`;
    } else {
      toDo._done = false;
      e.target.innerHTML = 'DONE'
      document.querySelector('#details').innerHTML = `<img class="w-100" src="/StressedDog.jpg" alt="stressed dog">`;
    }
    this.output()
  }

  edit(e, toDo){
    document.querySelector('#details').innerHTML =`<form action="#">
    <div class="mb-3">
      <label for="topic" class="form-label">Topic</label>
      <input type="text" class="form-control border-3" id="topic" value="${toDo.topic}">
    </div>
    <div class="mb-3">
      <label for="text" class="form-label">Description</label>
      <textarea class="form-control border-3" id="text" rows="4">${toDo.text}</textarea>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>`;
  document.querySelector('#details').firstChild.addEventListener('submit', e => this.updating(e, toDo));
  }

  selectAdd = () => {
    document.querySelector('#details').innerHTML =`<form action="#">
    <div class="mb-3">
      <label for="topic" class="form-label">Topic</label>
      <input type="text" class="form-control border-3" id="topic" placeholder="Short description">
    </div>
    <div class="mb-3">
      <label for="text" class="form-label">Description</label>
      <textarea class="form-control border-3" id="text" rows="4" placeholder="Long description"></textarea>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>`;
  document.querySelector('#details').firstChild.addEventListener('submit', this.adding);
}

  selectEdit(e, toDo){
    let parElement = document.createElement('p');
    let buttonEdit = document.createElement('button');
    buttonEdit.classList.add('btn', 'btn-info', 'm-1');
    buttonEdit.innerHTML = 'EDIT';
    buttonEdit.addEventListener('click', e => this.edit(e, toDo));

    let buttonDelete = document.createElement('button');
    buttonDelete.classList.add('btn', 'btn-danger', 'm-1');
    buttonDelete.innerHTML = 'DELETE';
    buttonDelete.addEventListener('click', e => this.delete(e, toDo));

  //START -> DONE Button
      let buttonDone= document.createElement('button');
      buttonDone.classList.add('btn', 'btn-success', 'm-1');
      if(toDo._done === true){
        buttonDone.innerHTML= 'UNDO';
      } else {
        buttonDone.innerHTML= 'DONE';
      }
      buttonDone.addEventListener('click', e => this.done(e, toDo));
  //END -> DONE Button

    parElement.innerHTML = toDo._text;
    document.querySelector('#details').innerHTML = "";
    document.querySelector('#details').appendChild(parElement);
    document.querySelector('#details').appendChild(buttonEdit);
    document.querySelector('#details').appendChild(buttonDelete);
    document.querySelector('#details').appendChild(buttonDone);
  }

  output(){
    document.querySelector('#list').innerHTML="";
    this.htmlCollection = document.createElement('ul');
    this.htmlCollection.classList.add('m-0', 'p-0');

    this._toDos.map( toDo => {
      if(toDo._deleted === false){
        let listElement = document.createElement('li');

        if(toDo._done === false){
          listElement.classList.add('btn', 'btn-info', 'm-2', 'w-100')
        } else {
          listElement.classList.add('btn', 'btn-dark', 'm-2', 'w-100')
        }

        listElement.innerHTML = toDo._topic;
        listElement.addEventListener('mouseenter', e => this.selectToDo(e, toDo));
        listElement.addEventListener('click',e =>  this.selectEdit(e, toDo));
        this.htmlCollection.appendChild(listElement);
      }
    });

    let listElement = document.createElement('li');
    listElement.classList.add('btn', 'btn-success', 'm-2', 'mt-3', 'w-100')
    listElement.innerHTML = 'ADD';
    listElement.addEventListener('click', this.selectAdd);
    this.htmlCollection.appendChild(listElement);



    document.querySelector('#list').appendChild(this.htmlCollection);
    var database = this;
    localStorage.setItem(database, 1);
  }

  setCurrentTrue(){this._current = true;}
  setCurrentFalse(){this._current = false;}
  get current(){return this._current;}
}

const todo1 = new ToDo('Clean the House', 'Living Room, Kitchen, Child Room, Felix toilette');
const todo2 = new ToDo('Homework for Bootcamp', 'Coding OOP and other stuff');
const todo3 = new ToDo('Go with the Dog', 'to duc lake, that into the forest and finally to the place where dog meets with friends');
const todo4 = new ToDo('Go with the Dogs', 'to duc lake, that into the forest and finally to the place where dog meets with friends');

// const todo5 = new List.ToDo('trtter','sdfgsdg');

const list = new List();
list.toDo = todo1;
list.toDo = todo2;
list.toDo = todo3;
list.toDo = todo4;
list.setCurrentTrue
console.log(localStorage.getItem(this));
list.output()