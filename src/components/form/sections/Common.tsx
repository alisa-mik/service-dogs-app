import React from "react";
import SectionInjector, { ISection } from "../SectionInjector";
import InputInjector from "../InputInjector";

const Common: React.FC<ISection> = ({ config, formik }) => {
  const renderSectionsAndInputs = () => {
    return config.map((item) => {
      if (item.itemGroup === "section") {
        return (
          <SectionInjector
            sectionType={item.itemType}
            config={item.items}
            formik={formik}
            itemProps={item.itemProps}
          />
        );
      }

      const { itemType = "text", path, label, itemProps = {} } = item;

      if (item.itemGroup === "input")
        return (
          <InputInjector
            inputType={itemType}
            path={path}
            label={label}
            formik={formik}
            itemProp={itemProps}
          />
        );

      return "error";
    });
  };

  return <>{renderSectionsAndInputs()}</>;
};

export default Common;
