import React from "react";
import SectionInjector, { ISection } from "../SectionInjector";
import InputInjector, { InputType } from "../InputInjector";

const Common: React.FC<ISection> = ({ config, formik }) => {
  const renderSectionsAndInputs = () => {
    return config.map((item) => {
      if (item.itemGroup === "section" && item.items) {
        if (item.itemType === "done" || item.itemType === "common") {
          return (
            <SectionInjector
              sectionType={item.itemType}
              config={item.items}
              formik={formik}
              itemProps={item.itemProps}
            />
          );
        }
      }

      const { itemType = "text", path, label, itemProps = {} } = item;

      if (item.itemGroup === "input") {
        if (
          [
            "text",
            "select",
            "date",
            "checkbox",
            "textarea",
            "category",
            "attendance",
          ].includes(itemType)
        ) {
          return (
            <InputInjector
              inputType={itemType as InputType}
              path={path || ""}
              label={label || ""}
              formik={formik}
              itemProp={itemProps}
            />
          );
        }
      }

      return "error";
    });
  };

  return <>{renderSectionsAndInputs()}</>;
};

export default Common;
