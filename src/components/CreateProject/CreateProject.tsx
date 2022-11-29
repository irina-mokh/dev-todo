import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { createProject } from '../../store/reducer';

type CreateProjectProps = {
  id: string,
  close: () => void,
};
export const CreateProject = (props: CreateProjectProps) => {
  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // eslint-disable-next-line prettier/prettier
    const data = new FormData(e.target as HTMLFormElement);

    dispatch(
      createProject({
        id: props.id,
        title: data.get('title'),
        tasks: { 'queue': [], 'development': [], 'done': []}
      })
    );
    props.close();
  };
  return (
    <form action="POST" onSubmit={handleSubmit} className="form">
      <fieldset className="fieldset">
        <label htmlFor="add-project">Title:</label>
        <input
          id="add-project"
          className="field"
          type="text"
          name="title"
          placeholder="Project 1"
        />
      </fieldset>
      <input className="btn" type="submit" value="Create project"></input>
    </form>
  );
};
