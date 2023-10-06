import Button from '@/shared/components/Button/Button';
import { Category } from '@/types/Category';
import { SubCategory } from '@/types/SubCategory';
import { useState } from 'react';
import CreateModal from '../CreateModal/CreateModal';
import SubCategoryInput from '../SubCategoryInput/SubCategoryInput';
import styles from './SubCategoriesRow.module.scss';

type SubCategoryRowProps = {
  categoryId: number;
  subCategories: SubCategory[] | undefined;
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
};

const SubCategoriesRow = ({
  categoryId,
  subCategories,
  setCategories
}: SubCategoryRowProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const addSubCategoryButton = () => {
    setShowModal(true);
  };

  // const handleAddSubCategoryButton = () => {};

  const editSubCategoryButton = (subCategoryId: number) => {
    setCategories(prev =>
      prev.map(cat => {
        if (cat.id === categoryId && cat.subCategories) {
          const updatedSubCategories = cat.subCategories.map(sCat => {
            if (sCat.id === subCategoryId) {
              return { ...sCat, isEditing: true };
            }
            return sCat;
          });
          return { ...cat, subCategories: updatedSubCategories };
        }
        return cat;
      })
    );
  };

  const deleteSubCategoryButton = (id: number) => {
    setCategories(prev =>
      prev.map(cat => {
        if (cat.subCategories) {
          const updatedSubCategories = cat.subCategories.filter(
            sCat => sCat.id !== id
          );
          return { ...cat, subCategories: updatedSubCategories };
        }
        return cat;
      })
    );
  };

  return subCategories?.map((subCategory, i) =>
    subCategory.isEditing ? (
      <div key={i} style={{ position: 'relative' }}>
        <SubCategoryInput
          categoryId={categoryId}
          subCategory={subCategory}
          setCategories={setCategories}
        />
      </div>
    ) : (
      <div key={i} className={styles.subCategoryContainer}>
        {subCategory.name}
        <Button
          className={styles.addServiceButton}
          onClick={() => addSubCategoryButton()}
        >
          +
        </Button>
        {showModal && <CreateModal />}
        <Button
          className={styles.editSubCategoryButton}
          onClick={() => editSubCategoryButton(subCategory.id)}
        >
          e
        </Button>
        <Button
          className={styles.deleteSubCategoryButton}
          onClick={() => deleteSubCategoryButton(subCategory.id)}
        >
          x
        </Button>
      </div>
    )
  );
};

export default SubCategoriesRow;
