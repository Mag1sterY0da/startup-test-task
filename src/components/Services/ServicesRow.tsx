import { Service } from '@/classes/Service';
import { SubCategory } from '@/classes/SubCategory';
import Button from '@/shared/components/Button/Button';
import styles from './ServicesRow.module.scss';

type ServicesRowProps = {
  subCategories: (SubCategory | Service)[];
};

const ServicesRow = ({ subCategories }: ServicesRowProps) => {
  const addSubCategoryButton = (): void => {};

  const editSubCategoryButton = (): void => {};

  const deleteSubCategoryButton = (): void => {};

  return subCategories.map((subCategory, i) => (
    <div
      key={i}
      className={`${styles.subCategoryContainer} ${
        subCategory instanceof Service
          ? styles.serviceStyle
          : styles.subCategoryStyle
      }`}
    >
      {subCategory.name}
      <Button
        className={styles.addServiceButton}
        onClick={() => addSubCategoryButton()}
      >
        <i className='ri-add-line ri-xs'></i>
      </Button>
      <Button
        className={styles.editSubCategoryButton}
        onClick={() => editSubCategoryButton()}
      >
        <i className='ri-pencil-line ri-xs'></i>
      </Button>
      <Button
        className={styles.deleteSubCategoryButton}
        onClick={() => deleteSubCategoryButton()}
      >
        <i className='ri-close-line ri-xs'></i>
      </Button>
    </div>
  ));
};

export default ServicesRow;
