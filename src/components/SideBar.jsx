import { Note, PlusSquare } from '@phosphor-icons/react';
import React, { useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function Sidebar({ createWorkSpace, workspaces, setCurrWS, currWS }) {
  const newWS = useRef();

  return (
    <>
      <div className="bg-primary w-1/6 h-screen fixed max-sm:w-[100%] max-sm:relative max-sm:h-fit max-sm:pb-5">
        <div className="w-full flex items-center justify-center text-white text-2xl pt-5 tracking-wide">
          <Note weight="fill" color="white" size={25} className="mr-2" />
          PlanItOut
        </div>

        <div className="px-4 mt-10">
          <TransitionGroup>
            {workspaces.map((wp, index) => (
              <CSSTransition key={wp} timeout={500} classNames="fade">
                <button
                  key={index}
                  className={`w-full ${
                    wp === currWS ? 'bg-secondary text-primary' : 'bg-primary-dull text-white'
                  } rounded-lg p-1 py-2 hover:bg-light hover:text-primary mb-3 text-left ps-4`}
                  onClick={() => setCurrWS(wp)}
                >
                  {wp}
                </button>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>

        <div className="px-4 mt-10">
          <input
            ref={newWS}
            type="text"
            className="w-full rounded-lg bg-white mb-2 ps-1 text-sm py-2"
            placeholder="Enter the New Workspace Name"
          />
          <button
            onClick={() => {
              createWorkSpace(newWS.current.value);
              newWS.current.value = '';
            }}
            className="w-full bg-secondary text-primary rounded-lg p-1 py-2 hover:bg-light mb-3 font-semibold"
          >
            Create +
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
