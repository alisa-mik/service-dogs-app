import styled from "styled-components";
import { CATEGORY_COLORS, WHITE } from "../../../config/colors";
import { categoriesTranslation } from "../../../config/categories";
import { IInput } from "../InputInjector";

const CategoriesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const CategoryTag = styled.span<{ selected: boolean; color: string }>`
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  user-select: none;
  font-size: 14px;
  color: ${({ selected }) => (selected ? WHITE : "#333")};
  background-color: ${({ selected, color }) => (selected ? color : "#e0e0e0")};
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    opacity: 0.8;
  }
`;

const CategoryInput: React.FC<IInput> = ({ path, formik }) => {
  const selectedCategories = [...formik.values[path]];

  const toggleCategory = (categoryName: string) => {
    const modified = selectedCategories.includes(categoryName)
      ? selectedCategories.filter((cat) => cat !== categoryName)
      : [...selectedCategories, categoryName];

    formik.setFieldValue(path, modified);
  };

  return (
    <CategoriesContainer>
      {Object.entries(CATEGORY_COLORS).map(([name, color]) => (
        <CategoryTag
          key={name}
          selected={selectedCategories.includes(name)}
          color={color}
          onClick={() => toggleCategory(name)}
        >
          {categoriesTranslation[name]}
        </CategoryTag>
      ))}
    </CategoriesContainer>
  );
};

export default CategoryInput;
