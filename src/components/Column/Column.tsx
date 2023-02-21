import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useDrop, DropTargetMonitor } from 'react-dnd';

import { AppDispatch } from '../../store';
import { INITIAL_TASK, moveTask } from '../../store/reducer';

import { ITask, Status } from '../../types';

import { Modal } from '../Modal/Modal';
import { TaskForm } from '../TaskForm/TaskForm';
import { useParams } from 'react-router-dom';
import { TaskThumb } from '../TaskThumb/TaskThumb';
import { useColumn } from '../../utils/hooks';

type ColumnProps = {
  type: Status,
};

export const Column = ({ type }: ColumnProps) => {
  const projectId = useParams().id;

  const [data, counter] = useColumn(String(projectId), type);
  const items = data.map((item) => <TaskThumb {...item} key={item.id} />);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const initialTask = {
    ...INITIAL_TASK,
    id: `${projectId}|task${counter}`,
    projectId: projectId ? projectId : '-',
    status: type,
    deadline: tomorrow.toISOString().split('T')[0],
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
