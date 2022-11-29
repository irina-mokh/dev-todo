import { IState, ITask, Status } from '../../types';
import { useState } from 'react';
import { Modal } from '../Modal/Modal';
import { TaskForm } from '../TaskForm/TaskForm';
import { editTask, INITIAL_TASK, prioritize } from '../../store/reducer';
import { useParams } from 'react-router-dom';
import { TaskThumb } from '../TaskThumb/TaskThumb';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop, DropTargetMonitor } from 'react-dnd';
import { AppDispatch } from '../../store';

type ColumnProps = {
  data: Array<ITask>,
  type: Status,
};

export const Column = ({ data, type }: ColumnProps) => {
  const { id } = useParams();

  const { tasks } = useSelector((state: IState) => state.main);
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
    drop: async (drag: ITask) => {
      const newTask = { ...drag, status: type, priority: 0 };
      dispatch(editTask(newTask));
      dispatch(prioritize(newTask));
    },
    collect: (monitor: DropTargetMonitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));

  return (
    <div className={`column ${isOver ? 'column_highlight' : ''}`} ref={drop}>
      <header className="column__header">
        <h2 className="column__name">{type}</h2>
        <button
          className="btn"
          onClick={() => {
            setIsAddTaskModal(true);
          }}
        >
          Add
        </button>
      </header>
      <ul className="column__list">{items}</ul>
      {isAddTaskModal && (
        <Modal title="Create Task" close={closeModal}>
          <TaskForm item={initialTask} create={true} close={closeModal} />
        </Modal>
      )}
    </div>
  );
};
