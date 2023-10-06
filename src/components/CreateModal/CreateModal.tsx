import { Category } from '@/classes/Category';
import { Service } from '@/classes/Service';
import { SubCategory } from '@/classes/SubCategory';
import Button from '@/shared/components/Button/Button';
import ModalWrapper from '../ModalWrapper/ModalWrapper';
import styles from './CreateModal.module.scss';

type CreateModalProps = {
  subCategoryId: number;
  categoryId: number;
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  closeModal: () => void;
};

const CreateModal = ({
  subCategoryId,
  categoryId,
  setCategories,
  closeModal
}: CreateModalProps) => {
  const addSubCategoryButton = (): void => {
    setCategories(prev =>
      prev.map(cat => {
        if (cat.getId() === categoryId) {
          if (cat.subCategories.find(s => s.getId() === subCategoryId)) {
            const newSubCategory: SubCategory = new SubCategory();
            cat.subCategories
              .find(s => s.getId() === subCategoryId)
              ?.addSubCategory(newSubCategory);
          }
        }
        return cat;
      })
    );
    closeModal();
  };

  const addServiceButton = (): void => {
    setCategories(prev =>
      prev.map(cat => {
        if (cat.getId() === categoryId) {
          if (cat.subCategories.find(s => s.getId() === subCategoryId)) {
            const newSubCategory: Service = new Service();
            cat.subCategories
              .find(s => s.getId() === subCategoryId)
              ?.addService(newSubCategory);
          }
        }
        return cat;
      })
    );
    closeModal();
  };

  return (
    <ModalWrapper>
      <h3>What do you want to create?</h3>
      <div className={styles.buttonGroup}>
        <Button className={styles.button} onClick={addSubCategoryButton}>
          Category
        </Button>
        <Button className={styles.button} onClick={addServiceButton}>
          Service
        </Button>
      </div>
    </ModalWrapper>
  );
};

export default CreateModal;
