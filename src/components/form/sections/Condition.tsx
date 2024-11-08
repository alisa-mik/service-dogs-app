import React, { useEffect, useState } from "react";
import SectionInjector, { ISection } from "../SectionInjector";
import InputInjector, { InputType } from "../InputInjector";

type Con = {
  path: string;
  values: string[];
};

interface IConditions extends ISection {
  conditions: Con[];
}

const Condition: React.FC<IConditions> = ({ config, formik, conditions }) => {
  const [renderSection, setRenderSection] = useState(false);

  useEffect(() => {
    const val = conditions.every((con) =>
      con.values.includes(formik.values[con.path])
    );
    setRenderSection(val);
  }, [formik.values]);

  const renderSectionsAndInputs = () => {
    return config.map((item) => {
      if (item.itemGroup === "section" && item.items) {
        if (["done", "common"].includes(item.itemType)) {
          return (
            <SectionInjector
              sectionType={item.itemType as "done" | "common"}
              config={item.items}
              formik={formik}
            />
          );
        }
      }

      const { itemType = "text", path, label, itemProps = {}, items } = item; // Extract items for config

      if (path && item.itemGroup === "input") {
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
              path={path}
              label={label || ""}
              config={items} // Pass config if needed
              formik={formik}
              itemProp={itemProps}
            />
          );
        }
      }

      return "error";
    });
  };

  if (!renderSection) return null;

  return <>{renderSectionsAndInputs()}</>;
};

export default Condition;
