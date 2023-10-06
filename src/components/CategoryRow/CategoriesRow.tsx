import { Category } from '@/classes/Category';
import { SubCategory } from '@/classes/SubCategory';
import Button from '@/shared/components/Button/Button';
import CategoryInput from '../CategoryInput/CategoryInput';
import SubCategoriesRow from '../SubCategories/SubCategoriesRow';
import styles from './CategoriesRow.module.scss';

type CategoriesRowProps = {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
};

const CategoriesRow = ({ categories, setCategories }: CategoriesRowProps) => {
  const addSubCategoryButton = (id: number): void => {
    const newSubCategory: SubCategory = new SubCategory();
    const updatedCategories: Category[] = categories.map(cat => {
      if (cat.getId() === id) {
        cat.addSubCategory(newSubCategory);
      }
      return cat;
    });
    setCategories(updatedCategories);
  };

  const editCategoryButton = (id: number): void => {
    const updatedCategories: Category[] = categories.map(cat => {
      if (cat.getId() === id) {
        cat.setIsEditing(true);
      }
      return cat;
    });
    setCategories(updatedCategories);
  };

  const deleteCategoryButton = (id: number): void => {
    setCategories(prev => [...prev.filter(cat => cat.getId() !== id)]);
  };

  return (
    <>
      {categories.map((category, i) =>
        category.getIsEditing() ? (
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
              onClick={() => addSubCategoryButton(category.getId())}
            >
              <i className='ri-add-line ri-xs'></i>
            </Button>
            <Button
              className={styles.editCategoryButton}
              onClick={() => editCategoryButton(category.getId())}
            >
              <i className='ri-pencil-line ri-xs'></i>
            </Button>
            <Button
              className={styles.deleteCategoryButton}
              onClick={() => deleteCategoryButton(category.getId())}
            >
              <i className='ri-close-line ri-xs'></i>
            </Button>
            <div className={styles.subCategoriesContainer}>
              <SubCategoriesRow
                key={i}
                categoryId={category.getId()}
                subCategories={category.subCategories}
                setCategories={setCategories}
              />
            </div>
          </div>
        )
      )}
    </>
  );
};

export default CategoriesRow;
