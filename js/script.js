/******************************************
                Lesson 12 (todo)
*******************************************/

'use strict';

// ************ Script Definitions ************** 

const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');
// список дел
let todoData =[];
//
const render = function() {
    todoList.textContent = '';
    todoCompleted.textContent = '';
    // если localStorage существует
    if ( localStorage.getItem('locStorageTodoList') ) {
        todoData = JSON.parse(localStorage.locStorageTodoList);
    } else {
        alert('Список дел пуст. Давайте начнем');
    }
    //
    todoData.forEach(function(item) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        
        li.innerHTML = '<span class="text-todo">' +item.value + '</span>' +
            '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
            '</div>';
        
        if (item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);    
        }
        // кнопка - дело выполнено/не выполнено
        const btnTodoComplete = li.querySelector('.todo-complete');

        btnTodoComplete.addEventListener('click', function(){
            item.completed = !item.completed;
            localStorage.setItem('locStorageTodoList', JSON.stringify(todoData));
            render();
        });
        // кнопка - удалить дело
        const btnTodoRemove = li.querySelector('.todo-remove');

        btnTodoRemove.addEventListener('click', function(){

            todoData.splice(todoData.indexOf(item),1);
            localStorage.setItem('locStorageTodoList', JSON.stringify(todoData));

            render();
            // если список дел пуст - удаляем localStorage
            if (todoData.length === 0) {
                localStorage.removeItem('locStorageTodoList')
            }
        }); 
    
    }); // END todoData.forEach

}; // END render

// добавление ново дела
todoControl.addEventListener('submit', function(event){
    event.preventDefault();

    const newTodo = {
        value: headerInput.value,
        completed: false
    };
    
    if (newTodo.value.trim() !== ''){
        todoData.push(newTodo);
        localStorage.setItem('locStorageTodoList', JSON.stringify(todoData));
        headerInput.value = '';
    } else {
        alert('Что вы хотите запланировать? Создайте новое дело >>>');
    }

    render();
});
// проверка браузера на поддержку localStorage
function storageAvailable(type) {
	try {
		var storage = window[type],
			x = '__storage_test__';
		storage.setItem(x, x);
        storage.removeItem(x);
		return true;
	}
	catch(e) {
		return false;
	}
}

// ************ Main Script ************** 

// проверка браузера на поддержку localStorage
if (!storageAvailable('localStorage')) {
    alert('<Ваш браузер не поддерживает localStorage! ');
}

render();

