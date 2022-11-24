import { AppDispatch } from '../../store';
import { useDispatch } from 'react-redux';
import { createProject } from '../../store/reducer';
import React from 'react';

type CreateProjectProps = {
	id: string;
	close: () => void;
}
export const CreateProject = (props: CreateProjectProps) => {

	const dispatch: AppDispatch = useDispatch();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = new FormData(e.target as HTMLFormElement);
		
		dispatch(createProject({
			id: props.id,
			title: data.get('title'),
		}))
		props.close();
	}
	return (
		<form action="POST" onSubmit={handleSubmit}>
			<label htmlFor="add-project">Title:</label>
			<input
				id="add-project"
				className="field"
				type="text"
				name="title"
				placeholder='Project 1'/>
			<input  className="btn" type="submit" value="Create project"></input>
		</form>
	)
}