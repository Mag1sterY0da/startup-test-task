import Button from '@/shared/components/Button/Button';
import { Category } from '@/types/Category';
import { SubCategory } from '@/types/SubCategory';
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
  const inputRef = useRef<HTMLInputElement>(null);

  const declineEditingButton = (id: number) => {
    setCategories(prev =>
      prev.map(cat => {
        if (cat.id === categoryId) {
          const updatedSubCategories = cat.subCategories?.filter(
            sCat => sCat.id !== id
          );
          return { ...cat, subCategories: updatedSubCategories };
        }
        return cat;
      })
    );
  };

  const approveEditingButton = (id: number) => {
    const inputValue = inputRef.current?.value || '';
    setCategories(prev =>
      prev.map(cat => ({
        ...cat,
        subCategories: cat.subCategories?.map(sCat => ({
          ...sCat,
          name: sCat.id === id ? inputValue : sCat.name,
          isEditing: false
        }))
      }))
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
        onClick={() => declineEditingButton(subCategory.id)}
      >
        x
      </Button>
      <Button
        className={styles.approveEditingButton}
        onClick={() => approveEditingButton(subCategory.id)}
      >
        y
      </Button>
    </>
  );
};

export default SubCategoryInput;
