import { Category } from '@/classes/Category';
import { SubCategory } from '@/classes/SubCategory';

interface CategoryData {
  id: number;
  name: string;
  isEditing: boolean;
  subCategories: SubCategoryData[];
}

interface SubCategoryData {
  id: number;
  name: string;
  isEditing: boolean;
}

export const getCategoriesFromLocalStorage = (): Category[] => {
  const storedCategories = JSON.parse(
    localStorage.getItem('categories') || '[]'
  ) as CategoryData[];

  return (
    storedCategories.map(categoryObj => {
      const category = new Category();
      category.setId(categoryObj.id);
      category.setName(categoryObj.name);
      category.setIsEditing(categoryObj.isEditing);
      category.subCategories = categoryObj.subCategories.map(subCategoryObj => {
        const subCategory = new SubCategory();
        subCategory.setId(subCategoryObj.id);
        subCategory.setName(subCategoryObj.name);
        subCategory.setIsEditing(subCategoryObj.isEditing);
        return subCategory;
      });
      return category;
    }) || []
  );
};

export const setCategoriesToLocalStorage = (categories: Category[]) => {
  localStorage.setItem(
    'categories',
    JSON.stringify(
      categories.map(category => ({
        id: category.getId(),
        name: category.name,
        isEditing: category.getIsEditing(),
        subCategories: category.subCategories.map(subCategory => ({
          id: subCategory.getId(),
          name: subCategory.name,
          isEditing: subCategory.getIsEditing()
        }))
      }))
    )
  );
};
