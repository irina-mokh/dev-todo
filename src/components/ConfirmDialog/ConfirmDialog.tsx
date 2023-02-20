import { Modal } from '../Modal/Modal';

export type ConfirmDialogPropsType = {
  confirmText: string,
  close: () => void,
  onConfirm: () => void,
};

export const ConfirmDialog = (props: ConfirmDialogPropsType) => {
  const { confirmText, close, onConfirm } = props;

  const handleConfirm = () => {
    close();
    onConfirm();
  };

  return (
    <Modal close={close} title="Are you sure?">
      <p className="confirm">{confirmText}</p>
      <div className="confirm__btns">
        <button className="btn" onClick={close}>
          Cancel
        </button>
        <button onClick={handleConfirm} className="btn">
          Yes
        </button>
      </div>
    </Modal>
  );
};
