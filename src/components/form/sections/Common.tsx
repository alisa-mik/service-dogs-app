import React from "react";
import SectionInjector, { ISection, Section } from "../SectionInjector";
import InputInjector, { InputType } from "../InputInjector";

const Common: React.FC<ISection> = ({ config, formik }) => {
  const renderSectionsAndInputs = () => {
    return config.map((item, key) => {
      if (item.itemGroup === "section" && item.items) {
        return (
          <SectionInjector
            key={key}
            sectionType={item.itemType as Section}
            config={item.items}
            formik={formik}
            itemProps={item.itemProps}
          />
        );
      }

      const { itemType = "text", path, label, itemProps = {} } = item;

      if (item.itemGroup === "input") {
        return (
          <InputInjector
            key={key}
            inputType={itemType as InputType}
            path={path || ""}
            label={label || ""}
            formik={formik}
            itemProp={itemProps}
          />
        );
      }
    });
  };

  return <>{renderSectionsAndInputs()}</>;
};

export default Common;
