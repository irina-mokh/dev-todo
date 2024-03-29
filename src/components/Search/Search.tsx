import { useState } from 'react';
import { ITask } from '../../types';
import { useTasks } from '../../utils/hooks';

export const Search = () => {
  const [results, setResults] = useState<Array<ITask>>([]);
  const [tasks] = useTasks();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const query = e.target.value;
    const res = tasks.filter((task) => task.id.includes(query) || task.title.includes(query));
    setResults([...res]);
  };
  const elements = results.map((task) => (
    <li className="search__res" key={task.id}>
      <p>{`Title: ${task.title}`}</p>
      <p>{`id: ${task.id}`}</p>
    </li>
  ));
  return (
    <form className="search">
      <fieldset className="search__bar">
        <input
          type="search"
          className="field"
          placeholder="Search task by id or title..."
          onChange={handleSearch}
        ></input>
        <input type="submit" className="btn" value="Search"></input>
      </fieldset>
      {results.length ? <ul className="search__list">{elements}</ul> : 'No matches found'}
    </form>
  );
};
