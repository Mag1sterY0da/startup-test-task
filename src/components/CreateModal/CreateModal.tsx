import Button from '@/shared/components/Button/Button';
import ModalWrapper from '../ModalWrapper/ModalWrapper';
import styles from './CreateModal.module.scss';

const CreateModal = () => {
  return (
    <ModalWrapper>
      <h3>What do you want to create?</h3>
      <div className={styles.buttonGroup}>
        <Button className={styles.button}>Category</Button>
        <Button className={styles.button}>Service</Button>
      </div>
    </ModalWrapper>
  );
};

export default CreateModal;
