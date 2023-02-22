import { IComment } from '../../types';
import { Comment } from '../Comment/Comment';
import { AddComment } from '../AddComment/AddComment';

type CommentsProps = {
  data: Array<IComment>,
  taskId: string,
};

export const Comments = ({ data, taskId }: CommentsProps) => {
  return (
    <section className="comments">
      <h3 className="comments__title">Comments:</h3>
      <AddComment parentId={taskId} />
      {data.length === 0 ? (
        <p className="comments__text">No comments found</p>
      ) : (
        <ul className="comments">
          {data.map((comment) => (
            <Comment key={comment.id} {...comment} />
          ))}
        </ul>
      )}
    </section>
  );
};
