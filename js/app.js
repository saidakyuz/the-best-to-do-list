
const todo = document.getElementById('todo');
const list = document.getElementById('todo').children;
const details = document.getElementById('details');
const detail_task  = document.getElementById('detail_task');
const detail_description  = document.getElementById('detail_description');
const add  = document.getElementById('add');
const create  = document.getElementById('create');
const store  = document.getElementById('store');

for ( let i = 0; i <list.length; ++i){

  list[i].addEventListener('dblclick', e => {
    if( list[i].classList.contains('done') === false){
      list[i].classList.add('done');
      list[i].classList.remove('selected');
    } else{
      list[i].classList.remove('done');
    }
  });

  list[i].addEventListener('click', e => {
    if( list[i].classList.contains('selected') === false){
      for ( let i = 0; i <list.length; ++i){
        list[i].classList.remove('selected');
      }
      list[i].classList.add('selected');
      detail_task.innerHTML = list[i].querySelector('.task').innerHTML;
      detail_description.innerHTML = list[i].querySelector('.description').innerHTML;
    }
  });
}


add.addEventListener('click', e => {
  e.preventDefault();
  create.classList.remove('visually-hidden');
  details.classList.add('visually-hidden');
})
store.addEventListener('click', e => {
  e.preventDefault();
  let cln =todo.firstElementChild.cloneNode(true);
  cln.querySelector('.task').innerHTML = create.querySelector('.task').value;
  cln.querySelector('.description').innerHTML = create.querySelector('.description').value;
  todo.appendChild(cln);
  create.classList.add('visually-hidden');
  details.classList.remove('visually-hidden');
})



