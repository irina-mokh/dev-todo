import { ISubtasks, ISubtask } from '../../types';
import { useState } from 'react';
import { Subtask } from '../Subtask/Subtask';

type SubtasksProps = {
  data: ISubtasks,
  taskId: string,
  handleChange: (data: ISubtasks) => void,
};

export const Subtasks = (props: SubtasksProps) => {
  const { taskId, data, handleChange } = props;

  const handleSubtaskChange = (task: ISubtask) => {
    const preserve = [...data];
    const i = data.findIndex((subtask) => subtask.id == task.id);
    preserve[i] = task;
    handleChange(preserve);
  };

  const items = data.map((item) => (
    <Subtask key={item.id} task={item} handleChange={handleSubtaskChange} />
  ));

  const [subInput, setSubInput] = useState('');

  return (
    <div className="subtasks">
      <fieldset className="fieldset subtasks__input">
        <input
          className="subtasks__field"
          id={`add-${taskId}`}
          placeholder="Add subtask..."
          onChange={(e) => setSubInput(e.target.value)}
        ></input>
        <label
          className="subtasks__add"
          onClick={() => {
            handleChange([
              ...data,
              { title: subInput, done: false, id: String(taskId + data.length) },
            ]);
            setSubInput('');
          }}
        >
          Add
        </label>
      </fieldset>
      <ul className="subtasks__list">{items}</ul>
    </div>
  );
};
