import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop, DropTargetMonitor } from 'react-dnd';

import { AppDispatch } from '../../store';
import { INITIAL_TASK, moveTask } from '../../store/reducer';

import { IState, ITask, Status } from '../../types';

import { Modal } from '../Modal/Modal';
import { TaskForm } from '../TaskForm/TaskForm';
import { useParams } from 'react-router-dom';
import { TaskThumb } from '../TaskThumb/TaskThumb';

type ColumnProps = {
  type: Status,
};

export const Column = ({ type }: ColumnProps) => {
  const { id } = useParams();

  const { tasks, current } = useSelector((state: IState) => state.main);

  const data = current[type];

  const items = data.map((item) => <TaskThumb {...item} key={item.id} />);

  const initialTask = {
    ...INITIAL_TASK,
    projectId: id ? id : '-',
    status: type,
    id: String(tasks.length),
  };

  const [isAddTaskModal, setIsAddTaskModal] = useState(false);
  const closeModal = () => {
    setIsAddTaskModal(false);
  };

  const dispatch: AppDispatch = useDispatch();

  // Drop task
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'task',
    drop: async (drag: ITask, monitor) => {
      if (monitor.didDrop()) {
        return;
      }
      const newTask = { ...drag, status: type, priority: 0 };
      dispatch(moveTask({ drag: drag, drop: newTask }));
    },
    collect: (monitor: DropTargetMonitor) => ({
      isOver: !!monitor.isOver({ shallow: true }),
      canDrop: !!monitor.canDrop(),
    }),
  }));

  return (
    <div className={`column ${isOver ? 'column_highlight' : ''}`} ref={drop}>
      <header className="column__header">
        <h2 className="column__name">{type}</h2>
        <button
          className="btn"
          title="add task"
          aria-label="add task"
          onClick={() => {
            setIsAddTaskModal(true);
          }}
        >
          +
        </button>
      </header>
      <div className="column__list-wrapper">
        <ul className="column__list">{items}</ul>
      </div>
      {isAddTaskModal && (
        <Modal title="Create Task" close={closeModal}>
          <TaskForm item={initialTask} create={true} close={closeModal} />
        </Modal>
      )}
    </div>
  );
};
