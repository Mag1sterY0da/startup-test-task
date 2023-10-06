import Button from '@/shared/components/Button/Button';
import { Category } from '@/types/Category';
import CategoryInput from '../CategoryInput/CategoryInput';
import SubCategoriesRow from '../SubCategories/SubCategoriesRow';
import styles from './CategoriesRow.module.scss';

type CategoriesRowProps = {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
};

const CategoriesRow = ({ categories, setCategories }: CategoriesRowProps) => {
  const addSubCategoryButton = (id: number) => {
    const newSubCategory = { id: Math.random(), name: '', isEditing: true };

    const updatedCategories = categories.map(cat => {
      if (cat.id === id) {
        return {
          ...cat,
          subCategories: [...(cat.subCategories || []), newSubCategory]
        };
      }
      return cat;
    });

    setCategories(updatedCategories);
  };

  const editCategoryButton = (id: number) => {
    setCategories(prev => [
      ...prev.map(cat => (cat.id === id ? { ...cat, isEditing: true } : cat))
    ]);
  };

  const deleteCategoryButton = (id: number) => {
    setCategories(prev => [...prev.filter(cat => cat.id !== id)]);
  };

  return categories.map((category, i) =>
    category.isEditing ? (
      <div key={i} style={{ position: 'relative' }}>
        <CategoryInput
          category={category}
          categories={categories}
          setCategories={setCategories}
        />
      </div>
    ) : (
      <div key={i} className={styles.categoryContainer}>
        {category.name}
        <Button
          className={styles.addSubcategoryButton}
          onClick={() => addSubCategoryButton(category.id)}
        >
          +
        </Button>
        <Button
          className={styles.editCategoryButton}
          onClick={() => editCategoryButton(category.id)}
        >
          e
        </Button>
        <Button
          className={styles.deleteCategoryButton}
          onClick={() => deleteCategoryButton(category.id)}
        >
          x
        </Button>
        <div
          className={styles.subCategoriesContainer}
          // ref={categoriesContainerRef}
        >
          <SubCategoriesRow
            key={i}
            categoryId={category.id}
            subCategories={category.subCategories}
            setCategories={setCategories}
          />
        </div>
      </div>
    )
  );
};

export default CategoriesRow;
