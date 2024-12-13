import React, { useState } from "react";
import { Input, Select as StyledSelect } from "../styledInputs";
import { IInput } from "../InputInjector";
import styled from "styled-components";

type Option = {
  value: string;
  label: string;
};

interface IAutoComplete extends IInput {
  options: Option[];
}

const DropdownContainer = styled.div`
  position: relative;
`;

const DropdownList = styled(StyledSelect).attrs({ as: "ul" })`
  position: absolute;
  top: 100%;
  left: 0;
  max-height: 200px;
  overflow-y: auto;
  right: 0;
  z-index: 10;
  list-style: none;
  margin-top: 2px;
  padding: 0;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2), 0px 2px 4px rgba(0, 0, 0, 0.14),
    0px 1px 4px rgba(0, 0, 0, 0.12);
`;

const DropdownItem = styled.li`
  padding: 8px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const NoOptionsItem = styled.li`
  padding: 8px;
  color: gray;
`;

const AutoComplete: React.FC<IAutoComplete> = ({ path, formik, options }) => {
  const getValueLabel = (val: string) => {
    const option = options.find((option) => option.value === val);
    return option ? option.label : "";
  };

  const [filteredOptions, setFilteredOptions] = useState<Option[]>(
    options.sort((a, b) => {
      if (a.value !== "" && b.value !== "") {
        return a.label.localeCompare(b.label);
      }
      return 0;
    })
  );

  const [showDropdown, setShowDropdown] = useState(false);
  const [inputValue, setInputValue] = useState(
    getValueLabel(formik.values[path])
  );

  const filterOptions = (value: string) => {
    const filtered = options.filter((option) =>
      option.label.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(value);
    filterOptions(value);
    setShowDropdown(value.trim() !== "");
  };

  const handleOptionSelect = (value: string) => {
    formik.setFieldValue(path, value);
    setInputValue(getValueLabel(value));
    setShowDropdown(false);
  };

  const handleBlur = () => {
    setTimeout(() => {
      if (!filteredOptions.some((option) => option.label === inputValue)) {
        setInputValue(getValueLabel(formik.values[path]));
        filterOptions("");
      }
      setShowDropdown(false);
    }, 200);
  };

  const handleFocus = () => {
    setInputValue("");
    setShowDropdown(true);
  };

  return (
    <DropdownContainer>
      <Input
        type="text"
        name={path}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {showDropdown && (
        <DropdownList>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <DropdownItem
                key={option.value}
                onMouseDown={() => handleOptionSelect(option.value)}
              >
                {option.label}
              </DropdownItem>
            ))
          ) : (
            <NoOptionsItem>לא נמצאה משפחה</NoOptionsItem>
          )}
        </DropdownList>
      )}
    </DropdownContainer>
  );
};

export default AutoComplete;
