import { Circle, Trash } from '@phosphor-icons/react';
import React, { useState } from 'react';


function Todo({ todo, updateTodoText, currTopic, completeTodo ,deleteTodo}) {
  const [text, setText] = useState(todo.text || '');

  const handleChange = (e) => {
    setText(e.target.value);
    updateTodoText(currTopic.name, todo.id, e.target.value);
  };

  return (
    <>

      <div className={`bg-light w-full rounded-lg mt-3 pt-2 ${todo.completed ? 'opacity-50' : ''}`}>
        <textarea
          value={text}
          onChange={handleChange}
          className={`text-primary border-none outline-none w-full bg-transparent resize-none overflow-hidden px-2 ${todo.completed ? 'line-through' : ''}`}
          rows={1}
          style={{ height: 'auto' }}
          onInput={(e) => {
            e.target.style.height = 'auto';
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
          placeholder='Enter the Todo Here...'
          disabled={todo.completed} // Disable input if todo is completed
        />

        <div className='flex w-full justify-end gap-3 px-5 pb-3'>
          <Trash
            weight='fill'
            size={22}
            className='cursor-pointer text-secondary'
            onClick={() => deleteTodo(currTopic.name, todo.id)} // Adjust if you want this to delete instead of complete
          />
          <Circle
            weight={todo.completed ? 'fill' : 'bold'}
            size={22}
            className={`cursor-pointer ${todo.completed ? 'text-primary' : 'text-primary-dull'}`}
            onClick={() => completeTodo(currTopic.name, todo.id)}
          />
        </div>
      </div>

    </>
  );
}

export default Todo;
