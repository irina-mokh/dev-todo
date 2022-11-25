import { IComment } from '../../types';

type CommentsProps = {
  data: Array<IComment>,
};

export const Comments = ({ data }: CommentsProps) => {
  const commentsRender = (data: Array<IComment>) => {
    const res = data.map((com) => (
      <li>
        <p>{com.text}</p>
        {com.subComments && <ul>{commentsRender(com.subComments)}</ul>}
      </li>
    ));
    return res;
  };

  return <ul className="comments">{commentsRender(data)}</ul>;
};
