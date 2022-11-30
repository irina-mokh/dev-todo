import { useState, useEffect } from 'react';
import { IComment } from '../../types';
import { AddComment } from '../AddComment/AddComment';

export const Comment = (comment: IComment) => {
  const { text, time, comments, id } = comment;
  const subs = comments.map((item) => <Comment {...item}></Comment>);
  const [isInput, setIsInput] = useState(false);
  const [isSubs, setIsSubs] = useState(false);

  const toggleSubs = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsSubs(!isSubs);
  };
  const toggleInput = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsInput(!isInput);
  };
  useEffect(() => {
    setIsSubs(isInput);
  }, [isInput]);
  return (
    <li className="comment">
      <header className="comment__header">
        <p className="comment__user">User Name</p>
        <p className="comment__time">{new Date(time).toLocaleString().slice(0, 17)}</p>
      </header>
      <p className="comment__text">{text}</p>
      <button
        onClick={toggleInput}
        className={`comment__btn reply ${isInput ? 'reply_active' : ''}`}
      >
        <span className="comment__arrow">&#5125;</span>
        <span>Reply</span>
      </button>
      <button onClick={toggleSubs} className={`comment__btn show ${isSubs ? 'show_active' : ''}`}>
        <span className="comment__arrow">&#5125;</span>
        <span>{`Show comments(${comments.length})`}</span>
      </button>
      {isInput && <AddComment id={id + '-' + comments.length} />}
      {comments && isSubs && <ul className="comment__subs">{subs}</ul>}
    </li>
  );
};
