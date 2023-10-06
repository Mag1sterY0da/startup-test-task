import styles from './ModalWrapper.module.scss'

type ModalWrapperProps = {
  children: React.ReactNode;
};

const ModalWrapper = ({ children }: ModalWrapperProps) => {
  return <div className={styles.modalWrapper}>{children}</div>;
};

export default ModalWrapper;
