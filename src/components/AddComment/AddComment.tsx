import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '../../store';
import { addComment } from '../../store/reducer';

type AddCommentProps = {
  parentId: string,
};

export const AddComment = ({ parentId }: AddCommentProps) => {
  const [comment, setComment] = useState('');
  const dispatch: AppDispatch = useDispatch();

  const handleComment = (e: React.MouseEvent) => {
    e.preventDefault();
    const newComment = {
      id: parentId + '-' + Date.now(),
      text: comment,
      comments: [],
      time: String(new Date()),
    };
    dispatch(addComment(newComment));
    setComment('');
  };

  return (
    <fieldset className="fieldset add-comment">
      <input
        type="text"
        className="field"
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
        }}
      ></input>
      <button className="btn" aria-label="add comment" onClick={handleComment}>
        Post
      </button>
    </fieldset>
  );
};
