import { Category } from '@/classes/Category';
import Button from '@/shared/components/Button/Button';
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
    setCategories(categories.filter(cat => cat.getId() !== id));
  };

  const approveEditingButton = (id: number) => {
    const inputValue = inputRef.current?.value || '';
    const updatedCategories = categories.map(cat => {
      if (cat.getId() === id) {
        cat.setName(inputValue);
        cat.setIsEditing(false);
      }
      return cat;
    });
    setCategories(updatedCategories);
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
        onClick={() => declineEditingButton(category.getId())}
      >
        <i className='ri-close-line ri-xs'></i>
      </Button>
      <Button
        className={styles.approveEditingButton}
        onClick={() => approveEditingButton(category.getId())}
      >
        y
      </Button>
    </>
  );
};

export default CategoryInput;
