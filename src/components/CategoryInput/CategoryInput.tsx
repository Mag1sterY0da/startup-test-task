import Button from '@/shared/components/Button/Button';
import { Category } from '@/types/Category';
import { useRef } from 'react';
import styles from './CategoryInput.module.scss';

type CategoryInputProps = {
  category: Category;
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
};

const CategoryInput = ({
  category,
  categories,
  setCategories
}: CategoryInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const declineEditingButton = (id: number) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  const approveEditingButton = () => {
    const inputValue = inputRef.current?.value || '';
    setCategories(prev =>
      prev.map(cat =>
        cat.id === category.id
          ? { ...cat, name: inputValue, isEditing: false }
          : cat
      )
    );
  };

  return (
    <>
      <input
        className={`${styles.categoryContainer} ${styles.isEditing}`}
        defaultValue={category.name}
        placeholder='Category name'
        ref={inputRef}
      />
      <Button
        className={styles.declineEditingButton}
        onClick={() => declineEditingButton(category.id)}
      >
        x
      </Button>
      <Button
        className={styles.approveEditingButton}
        onClick={() => approveEditingButton()}
      >
        y
      </Button>
    </>
  );
};

export default CategoryInput;
