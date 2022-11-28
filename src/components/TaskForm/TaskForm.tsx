import { useForm, SubmitHandler } from 'react-hook-form';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { getDuration, readFileAsync } from '../../utils';
import { ISubtasks, ITask, Status } from '../../types';
import { createTask, editTask, prioritize } from '../../store/reducer';
import { Comments } from '../Comments/Comments';
import { Subtasks } from '../Subtasks/Subtasks';

interface TaskFormProps {
  item: ITask;
  create: boolean;
  close: () => void;
}

export interface ITaskForm {
  id: string;
  projectId: string;
  title: string;
  description: string;
  created: string;
  duration: string;
  deadline: string;
  priority: number;
  fileName: string;
  status: Status;
  subTasks: ISubtasks;
  file: string;
  // comments: Array<IComment>;
  // file?: FileList | null;
}

export const TaskForm = ({ close, create, item }: TaskFormProps) => {
  const { file, fileName, comments, created, subTasks, id, priority } = item;
  const dispatch: AppDispatch = useDispatch();

  const [fileErr, setFileErr] = useState('');
  const [uploadText, setUploadText] = useState(fileName || 'Attachment(max 1MB)...');
  const [upload, setUpload] = useState(file);
  const [subs, setSubs] = useState<ISubtasks>(subTasks);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    setFileErr('');
    if (files) {
      if (files[0].size > 1048487) {
        setFileErr('File is too big');
      }
      setUpload(String(await readFileAsync(files[0])));
      setUploadText(files[0].name);
    }
  };

  const {
    handleSubmit,
    register,
    formState: { isValid },
  } = useForm<ITaskForm>({
    defaultValues: { ...item, file: upload },
  });

  const onSubmit: SubmitHandler<ITaskForm> = async (data) => {
    const newTodo = {
      ...data,
      created: created || String(new Date()),
      file: upload,
      fileName: upload ? uploadText : '',
      subTasks: subs,
    };

    if (create) {
      dispatch(createTask(newTodo));
    } else {
      dispatch(editTask(newTodo));
    }
    if (create || priority !== newTodo.priority) {
      dispatch(prioritize(newTodo));
    }
    close();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <fieldset className="fieldset form__fieldset">
        <div className="form__col">
          {/* Title */}
          <label className="label">
            <span className="label__text">Title*:</span>
            <input
              type="text"
              {...register('title', { required: true })}
              className="field"
              placeholder="Task 1"
            />
          </label>
          {/* Priority */}
          <label className="label">
            <span className="label__text">Priority:</span>
            <input type="number" {...register('priority', { required: true })} className="field" />
          </label>
          {/* Status */}
          <label className="label">
            <span className="label__text">Status*:</span>
            <select {...register('status')} className="field">
              <option value="queue">queue</option>
              <option value="development">development</option>
              <option value="done">done</option>
            </select>
          </label>
          {/* Description */}
          <label className="label">
            <span className="label__text">Description:</span>
            <textarea
              rows={3}
              {...register('description')}
              className="field textarea"
              placeholder="Some description"
            ></textarea>
          </label>
        </div>
        <div className="form__col">
          {/* Deadline */}
          <label className="label">
            <span className="label__text">Deadline*:</span>
            <input
              type="date"
              {...register('deadline', { required: true })}
              className="field"
            ></input>
          </label>
          {/* In progress */}
          {!create && (
            <span className="label__text">
              In progress:
              <span className="duration">{getDuration(new Date(created))}</span>
            </span>
          )}
          {/* Subtasks */}
          <label className="label form__subtasks">
            <span className="label__text">Subtasks:</span>
            <Subtasks
              data={subs}
              taskId={id}
              handleChange={(data: ISubtasks) => {
                setSubs(data);
              }}
            />
          </label>
        </div>
      </fieldset>

      <fieldset className="fieldset form__row">
        <label className="label upload btn">
          {upload ? `Change attachment ${uploadText}` : uploadText}
          <input type="file" {...register('file')} onChange={handleUpload}></input>
        </label>
        {upload && (
          <>
            <a href={upload} download className="task__file">
              {uploadText}
            </a>
          </>
        )}
      </fieldset>
      {fileErr && <p className="error">{fileErr}</p>}

      <div className="form__row">
        <input
          type="submit"
          value={create ? 'Add' : 'Save'}
          className="submit btn"
          disabled={!isValid}
        ></input>
      </div>
      {!create && <Comments data={comments} />}
    </form>
  );
};
