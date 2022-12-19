import { Modal } from '../Modal/Modal';

export type ConfirmDialogPropsType = {
  confirmText: string,
  setOpen: (arg: boolean) => void,
  onConfirm: () => void,
};

export const ConfirmDialog = (props: ConfirmDialogPropsType) => {
  const { confirmText, setOpen, onConfirm } = props;

  const close = () => {
    setOpen(false);
  };

  return (
    <Modal close={close} title="Are you sure?">
      <p className="confirm">{confirmText}</p>
      <div className="confirm__btns">
        <button className="btn" onClick={close}>
          Cancel
        </button>
        <button
          onClick={() => {
            close();
            onConfirm();
          }}
          className="btn"
        >
          Yes
        </button>
      </div>
    </Modal>
  );
};
