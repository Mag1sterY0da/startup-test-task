import { Category } from '@/classes/Category';
import { SubCategory } from '@/classes/SubCategory';
import Button from '@/shared/components/Button/Button';
import { useState } from 'react';
import CreateModal from '../CreateModal/CreateModal';
import ServicesRow from '../Services/ServicesRow';
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
  const [subCategoryId, setSubCategoryId] = useState<number>();

  const openModal = (): void => setShowModal(true);

  const closeModal = (): void => setShowModal(false);

  const addSubCategoryButton = (subCategoryId: number): void => {
    openModal();
    setSubCategoryId(subCategoryId);
  };

  const editSubCategoryButton = (subCategoryId: number): void => {
    setCategories(prev =>
      prev.map(cat => {
        if (cat.getId() === categoryId) {
          cat.editSubCategory(subCategoryId);
        }
        return cat;
      })
    );
  };

  const deleteSubCategoryButton = (id: number): void => {
    setCategories(prev =>
      prev.map(cat => {
        if (cat.getId() === categoryId) {
          cat.removeSubCategory(id);
        }
        return cat;
      })
    );
  };

  return subCategories?.map((subCategory, i) =>
    subCategory.getIsEditing() ? (
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
          onClick={() => addSubCategoryButton(subCategory.getId())}
        >
          <i className='ri-add-line ri-xs'></i>
        </Button>
        {showModal && subCategoryId === subCategory.getId() && (
          <CreateModal
            categoryId={categoryId}
            subCategoryId={subCategoryId}
            setCategories={setCategories}
            closeModal={closeModal}
          />
        )}
        <Button
          className={styles.editSubCategoryButton}
          onClick={() => editSubCategoryButton(subCategory.getId())}
        >
          <i className='ri-pencil-line ri-xs'></i>
        </Button>
        <Button
          className={styles.deleteSubCategoryButton}
          onClick={() => deleteSubCategoryButton(subCategory.getId())}
        >
          <i className='ri-close-line ri-xs'></i>
        </Button>
        <div className={styles.subCategoriesContainer}>
          <ServicesRow
            key={i}
            subCategories={[
              ...subCategory.subCategories,
              ...subCategory.services
            ]}
          />
        </div>
      </div>
    )
  );
};

export default SubCategoriesRow;
