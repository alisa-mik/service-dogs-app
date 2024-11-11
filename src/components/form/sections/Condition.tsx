import React, { useEffect, useState } from "react";
import SectionInjector, { ISection, Section } from "../SectionInjector";
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
    return config.map((item, key) => {
      if (item.itemGroup === "section" && item.items) {
        return (
          <SectionInjector
            key={key}
            sectionType={item.itemType as Section}
            config={item.items}
            formik={formik}
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

  if (!renderSection) return null;

  return <>{renderSectionsAndInputs()}</>;
};

export default Condition;
