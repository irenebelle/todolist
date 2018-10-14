window.onload = function() {
   let todoList = [];

    let renderList =  function () {
        for (let key in todoList) {
            createItem(todoList[key].id, todoList[key].top, todoList[key].left, todoList[key].todo, todoList[key].check);
        }
    } //end of render

    let createItem = function(id, top, left, todo, check) {
        let newItem = document.createElement('div');
            newItem.setAttribute('class', 'todoListItem');
            newItem.setAttribute('draggable', 'true');
            newItem.setAttribute('id', id);
            // newItem.style.top = top;
            // newItem.style.left = left;
            // newItem.style.position = 'absolute';
            newItem.textContent = todo;

            let newItemCheckbox = document.createElement('input');
            newItemCheckbox.type = 'checkbox';
            if(check == true) {
                newItem.style.backgroundColor = 'rgb(254, 188, 124)';
                newItemCheckbox.setAttribute('checked', 'checked');
            }
            newItemCheckbox.style.float = 'left';
            newItemCheckbox.className = 'checkbox';

            let imgTrash = document.createElement('img');
            imgTrash.src = "trash.png";
            imgTrash.style.float = 'right';
            imgTrash.className = 'delete';



            document.getElementById('todoListContainer').appendChild(newItem);
            newItem.appendChild(newItemCheckbox);
            newItem.appendChild(imgTrash);

    }//enf od createItem
  

    if (localStorage.getItem('todo') != undefined) {
        todoList = JSON.parse(localStorage.getItem('todo'));
        renderList();
    }// рендер при открытие страницы

        document.querySelector('#add').onclick = function() {
        let inputValue = document.querySelector('#in').value;
        if(inputValue!='') {
            let id=0; let top='150px';
            //определяем id i top нового элемента
            if (todoList.length != 0)   {
                id = +todoList[todoList.length - 1].id.substring(2) + 1;
                top = parseInt(todoList[todoList.length - 1].top)+41+'px';
             }

            createItem('id' + id, top, '0px', inputValue, false);
            todoList.push({ id: 'id' + id, todo: inputValue, check: false, top:top, left:0});
            //renderList();
            localStorage.setItem('todo', JSON.stringify(todoList));
            document.querySelector('#in').value = '';
      }
    }

    document.querySelector('#todoListContainer').onclick = function(event) {
            let parentId = event.target.parentNode.id;
            let parent = document.querySelector('#' + event.target.parentNode.id);

            if (event.target.className == 'checkbox') {

                let checkbox = parent.firstChild.nextSibling;
                   if (checkbox.checked) {
                    parent.style.backgroundColor = 'rgb(254, 188, 124)';
                 for (let key in todoList) {
                    if (todoList[key].id == parentId) {
                        todoList[key].check = true;
                    }
                }
            } else {
                parent.style.backgroundColor = '#eee';

                for (let key in todoList) {
                    if (todoList[key].id == parentId) {
                        todoList[key].check = false;
                    }
                }
            }

            localStorage.setItem('todo', JSON.stringify(todoList));
            }

            else if (event.target.className == 'delete') {
                for (let i = 0; i < todoList.length; i++) {
                if (todoList[i].id == parentId) {
                    todoList.splice(i, 1);
                }

            }   
            localStorage.setItem('todo', JSON.stringify(todoList));
            parent.parentNode.removeChild(parent);
            }
}

//перетаскивание работает крыво
var dragging = null;

document.addEventListener('dragstart', function(event) {
        dragging = event.target;
    event.dataTransfer.setData('text/html', dragging);
});

document.addEventListener('dragover', function(event) {
    event.preventDefault();
    //window.requestAnimationFrame(function(){
        var bounding = event.target.getBoundingClientRect()
      var offset = bounding.y + (bounding.height/2);
      //добавляет синюю полосу
      if ( event.clientY - offset > 0 ) { 
        event.target.style['border-bottom'] = 'solid 4px blue';
        event.target.style['border-top'] = '';
      } else {
        event.target.style['border-top'] = 'solid 4px blue';
        event.target.style['border-bottom'] = '';
      }
    //});
});
//сбрасывает стиль с синей полосой
document.addEventListener('dragleave', function(event) {
    event.target.style['border-bottom'] = '';
    event.target.style['border-top'] = '';
});


document.addEventListener('drop', function(event) {
    event.preventDefault();
    if ( event.target.style['border-bottom'] !== '' ) {
      event.target.style['border-bottom'] = '';
      event.target.parentNode.insertBefore(dragging, event.target.nextSibling);
    } else {
      event.target.style['border-top'] = '';
      event.target.parentNode.insertBefore(dragging, event.target);
            console.log(event.target.getBoundingClientRect() + event.target.id);

    }
});
    








}