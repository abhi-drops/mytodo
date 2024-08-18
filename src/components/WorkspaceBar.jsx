import {React , useRef, useState ,useEffect} from 'react'
import Topic from './Topic'
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';

function WorkspaceBar({ currWS }) {
  const newTopicName = useRef();

  const [topics, setTopics] = useState([]);

  // This useEffect will run whenever currWS changes and will update the topics accordingly
  useEffect(() => {
    if (currWS) {
      const storedTopics = localStorage.getItem(currWS);
      setTopics(storedTopics ? JSON.parse(storedTopics) : []);
    }
  }, [currWS]);

  function createTopic() {
    const inputText = newTopicName.current.value.trim();

    if (inputText === "") {
      return null;
    }

    const newTopic = {
      name: inputText,
      todos: [],
    };

    const updatedTopics = [...topics, newTopic];
    setTopics(updatedTopics);
    localStorage.setItem(currWS, JSON.stringify(updatedTopics));
    newTopicName.current.value = "";


  }

  function deleteTopic(topicName) {
    const updatedTopics = topics.filter((topic) => topic.name !== topicName);
    setTopics(updatedTopics);
    localStorage.setItem(currWS, JSON.stringify(updatedTopics));
  }

  // Create a new todo
  function createTodo(topicName) {


    const updatedTopics = topics.map((topic) => {
      if (topic.name === topicName) {
        return {
          ...topic,
          todos: [...topic.todos, { id: Date.now(), text:"", completed: false }],
        };
      }
      return topic;
    });
    setTopics(updatedTopics);
    localStorage.setItem(currWS, JSON.stringify(updatedTopics));

    console.log("create todo");
  }

  function updateTodoText(topicName, todoId, newText) {
    const updatedTopics = topics.map((topic) => {
      if (topic.name === topicName) {
        return {
          ...topic,
          todos: topic.todos.map((todo) =>
            todo.id === todoId ? { ...todo, text: newText } : todo
          ),
        };
      }
      return topic;
    });

    setTopics(updatedTopics);
    localStorage.setItem(currWS, JSON.stringify(updatedTopics));

  }

  function completeTodo(topicName, todoId) {
    const updatedTopics = topics.map((topic) => {
      if (topic.name === topicName) {
        return {
          ...topic,
          todos: topic.todos.map((todo) =>
            todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
          ),
        };
      }
      return topic;
    });

    setTopics(updatedTopics);
    localStorage.setItem(currWS, JSON.stringify(updatedTopics));

  }

  function deleteTodo(topicName, todoId) {
    const updatedTopics = topics.map((topic) => {
      if (topic.name === topicName) {
        return {
          ...topic,
          todos: topic.todos.filter((todo) => todo.id !== todoId),
        };
      }
      return topic;
    });

    setTopics(updatedTopics);
    localStorage.setItem(currWS, JSON.stringify(updatedTopics));
  }


  return (
    <>
      <div className="min-h-screen bg-light-primary p-10 flex gap-5 overflow-scroll max-sm:min-h-svh workspace max-sm:flex-col max-sm:p-4">
      <TransitionGroup className="todo-list flex gap-5 max-sm:flex-col-reverse">
        {topics.map((topic, index) => {
          return (
            <CSSTransition key={topic.name} timeout={500} classNames="fade">
          <Topic key={index} currTopic={topic} currWS={currWS} deleteTopic={deleteTopic} createTodo={createTodo} updateTodoText={updateTodoText} completeTodo={completeTodo} deleteTodo={deleteTodo} />
          </CSSTransition>
        )
        })}

      </TransitionGroup>

        {
          currWS ? <div className="bg-primary min-w-[20vw] p-4 rounded-lg text-white h-fit">
          <input
            ref={newTopicName}
            type="text"
            className="w-full rounded-lg bg-white text-primary mb-2 ps-1 text-sm py-2"
            placeholder="Enter a New Topic "
          />
          <button
            className="w-full mt-1 bg-secondary text-primary rounded-lg p-1 py-2 hover:bg-light font-semibold"
            onClick={createTopic}
          >
            Create +
          </button>
        </div> : ""

        }



      </div>
    </>
  );
}

export default WorkspaceBar;
