import { IComment } from '../../types';
import { useState } from 'react';
import { AddComment } from '../AddComment/AddComment';

export const Comment = (comment: IComment) => {
  const { text, time, comments, id } = comment;
  const subs = comments.map((item) => <Comment {...item}></Comment>);
  const [isInput, setIsInput] = useState(false);

  const toggleInput = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsInput(!isInput);
  };
  return (
    <li className="comment">
      <header className="comment__header">
        <p className="comment__user">User Name</p>
        <p className="comment__time">{new Date(time).toLocaleString().slice(0, 17)}</p>
      </header>
      <p className="comment__text">{text}</p>
      <button onClick={toggleInput} className="comment__reply">
        <span className="comment__arrow">&#11177;</span>
        <span>Reply</span>
      </button>
      {isInput && <AddComment id={id + '-' + comments.length} />}
      {comments && <ul className="comment__subs">{subs}</ul>}
    </li>
  );
};
