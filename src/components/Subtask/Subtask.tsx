import { useState } from 'react';
import { ISubtask } from '../../types';

type SubtaskProps = {
  task: ISubtask,
  handleChange: (item: ISubtask) => void,
};

export const Subtask = (props: SubtaskProps) => {
  const { title, done, id } = props.task;
  const [checked, setChecked] = useState(done);

  return (
    <li className="subtask">
      <input
        className="subtask__checkbox"
        type="checkbox"
        checked={checked}
        onChange={(e) => {
          setChecked(e.target.checked);
          props.handleChange({ title, done: e.target.checked, id });
        }}
      ></input>
      <label className={`subtask__text ${checked ? 'subtask__text_done' : ''}`}>{title}</label>
    </li>
  );
};
