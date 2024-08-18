import { Trash } from '@phosphor-icons/react'
import React from 'react'
import Todo from './Todo'
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';


function Topic({currTopic,currWS,deleteTopic,createTodo,updateTodoText,completeTodo,deleteTodo}) {
  return (
    <>

      <div className=' bg-primary min-w-[20vw] p-4 rounded-lg text-white h-fit max'>
        <div className='flex w-full justify-between'>
          <p className='tracking-widest font-semibold'>{currTopic.name}</p>
          <Trash weight='fill' className=' cursor-pointer hover:text-secondary' size={22} onClick={()=>{deleteTopic(currTopic.name)}} />
        </div>


          <TransitionGroup>
          {currTopic.todos.map((t)=>{

            return(
              <CSSTransition key={t.name} timeout={500} classNames="fade">
             <Todo key={t.id} todo={t} updateTodoText={updateTodoText} currTopic={currTopic} completeTodo={completeTodo} deleteTodo={deleteTodo} />
             </CSSTransition>
            )

          })}

          </TransitionGroup>





        <button className='w-full mt-7 bg-secondary  text-primary rounded-lg p-1 py-2 hover:bg-light   font-semibold' onClick={()=>{createTodo(currTopic.name)}}>
          Add New Todo
        </button>
      </div>

    </>
  )
}

export default Topic