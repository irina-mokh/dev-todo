import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ConfirmDialog } from '../ConfirmDialog/ConfirmDialog';
import { deleteProject } from '../../store/reducer';
import { AppDispatch } from '../../store';
import { IProject } from '../../types';
import { usePopup } from '../../utils/hooks';

export const ProjectThumb = (props: IProject) => {
  const { id, title } = props;
  const [isDialog, openDialog, closeDialog] = usePopup(false);
  const dispatch: AppDispatch = useDispatch();

  return (
    <li key={id} className="project-thumb">
      <Link to={`project/${id}`} className="project-thumb__link">
        <p className="project-thumb__title">{title}</p>
      </Link>
      <button className="project-thumb__delete" onClick={openDialog} aria-label="delete project">
        🗙
      </button>
      {isDialog && (
        <ConfirmDialog
          confirmText={`Delete project ${title}?`}
          close={closeDialog}
          onConfirm={() => dispatch(deleteProject(id))}
        ></ConfirmDialog>
      )}
    </li>
  );
};
