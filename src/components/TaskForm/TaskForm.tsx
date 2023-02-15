import { useForm, SubmitHandler } from 'react-hook-form';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '../../store';
import { createTask, editTask } from '../../store/reducer';
import { getDuration, readFileAsync } from '../../utils';

import { ISubtasks, ITask, Status } from '../../types';

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
  fileNames: Array<string>;
  status: Status;
  subTasks: ISubtasks;
  files: Array<string>;
}

export const TaskForm = ({ close, create, item }: TaskFormProps) => {
  const { files, fileNames, comments, created, subTasks, id } = item;
  const dispatch: AppDispatch = useDispatch();
  const [fileErr, setFileErr] = useState('');
  const [uploadNames, setUploadNames] = useState(fileNames);
  const [uploads, setUploads] = useState([...files]);
  const [subs, setSubs] = useState<ISubtasks>([...subTasks]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    setFileErr('');
    async function handleFile(file: File) {
      if (file.size > 1048487) {
        setFileErr('File is too big');
      }
      const fileStr = String(await readFileAsync(file));
      setUploads((state) => [...state, fileStr]);
      setUploadNames((state) => [...state, file.name]);
    }
    if (files) {
      Array.from(files).forEach(async (file) => await handleFile(file));
    }
  };

  let attaches;
  if (uploads.length) {
    attaches = uploads.map((item, i) => (
      <li key={i} className="file">
        <a href={item}>{uploadNames[i]}</a>
      </li>
    ));
  }

  const {
    handleSubmit,
    register,
    formState,
    formState: { isValid },
  } = useForm<ITaskForm>({
    defaultValues: { ...item, files: [...uploads] },
  });

  const onSubmit: SubmitHandler<ITaskForm> = async (data) => {
    const newTodo = {
      ...data,
      comments: [...item.comments],
      created: created || String(new Date()),
      files: uploads,
      fileNames: uploads.length ? uploadNames : [],
      subTasks: subs,
    };

    if (create) {
      dispatch(createTask(newTodo));
    } else {
      dispatch(editTask(newTodo));
    }
    close();
  };

  console.log('form:', formState.isValidating);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <fieldset className="fieldset form__fieldset">
        <div className="form__col">
          {/* Title */}
          <label className="label">
            <span className="form__text">Title*:</span>
            <input
              type="text"
              {...register('title', { required: true })}
              className="field"
              placeholder="Task 1"
            />
          </label>
          {/* Priority */}
          <label className="label">
            <span className="form__text">Priority:</span>
            <input type="number" {...register('priority', { required: true })} className="field" />
          </label>
          {/* Status */}
          <label className="label">
            <span className="form__text">Status*:</span>
            <select {...register('status')} className="field">
              <option className="option" value="queue">
                queue
              </option>
              <option className="option" value="development">
                development
              </option>
              <option className="option" value="done">
                done
              </option>
            </select>
          </label>
        </div>
        <div className="form__col">
          {/* Deadline */}
          <label className="label">
            <span className="form__text">Deadline*:</span>
            <input
              type="date"
              {...register('deadline', { required: true })}
              className="field"
            ></input>
          </label>
          {/* In progress */}
          {!create && (
            <span className="duration">{`In progress: ${getDuration(new Date(created))}`}</span>
          )}
          {/* Subtasks */}
          <label className="label form__subtasks">
            <span className="form__text">Subtasks:</span>
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

      {/* Description */}
      <label className="label">
        <span className="form__text">Description:</span>
        <textarea
          rows={3}
          {...register('description')}
          className="field textarea"
          placeholder="Some description"
        ></textarea>
      </label>
      <fieldset className="fieldset attaches">
        <div className="form__fieldset">
          <legend className="form__text">Attachments:</legend>
          <label className="btn upload">
            Add
            <input type="file" {...register('files')} onChange={handleUpload}></input>
          </label>
        </div>
        {uploads.length > 0 && <ul className="attaches__list">{attaches}</ul>}
      </fieldset>
      {fileErr && <p className="error">{fileErr}</p>}

      <fieldset className=" fieldset form__fieldset">
        <input
          type="submit"
          value={create ? 'Add' : 'Save'}
          className="submit btn"
          disabled={!isValid}
        ></input>
      </fieldset>
      {!create && <Comments data={comments} taskId={id} />}
    </form>
  );
};
