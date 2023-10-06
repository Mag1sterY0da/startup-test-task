import { Category } from '@/classes/Category';
import { SubCategory } from '@/classes/SubCategory';
import Button from '@/shared/components/Button/Button';
import { useRef } from 'react';
import styles from './SubCategoryInput.module.scss';

type SubCategoryInputProps = {
  categoryId: number;
  subCategory: SubCategory;
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
};

const SubCategoryInput = ({
  categoryId,
  subCategory,
  setCategories
}: SubCategoryInputProps) => {
  const inputRef: React.MutableRefObject<HTMLInputElement | null> =
    useRef<HTMLInputElement>(null);

  const declineEditingButton = (id: number): void => {
    setCategories(prev =>
      prev.map(cat => {
        if (cat.getId() === categoryId) {
          cat.removeSubCategory(id);
        }
        return cat;
      })
    );
  };

  const approveEditingButton = (id: number): void => {
    const inputValue: string = inputRef.current?.value || '';
    setCategories(prev =>
      prev.map(cat => {
        if (cat.getId() === categoryId) {
          cat.approveSubCategoryEditing(id, inputValue);
        }
        return cat;
      })
    );
  };

  return (
    <>
      <input
        className={`${styles.subCategoryContainer} ${styles.isEditing}`}
        defaultValue={subCategory.name}
        placeholder='Category name'
        ref={inputRef}
      />
      <Button
        className={styles.declineEditingButton}
        onClick={() => declineEditingButton(subCategory.getId())}
      >
        <i className='ri-close-line ri-xs'></i>
      </Button>
      <Button
        className={styles.approveEditingButton}
        onClick={() => approveEditingButton(subCategory.getId())}
      >
        <i className='ri-check-line ri-xs'></i>
      </Button>
    </>
  );
};

export default SubCategoryInput;
