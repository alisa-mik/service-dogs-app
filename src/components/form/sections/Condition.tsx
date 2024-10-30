import React, { useEffect, useState } from "react";
import SectionInjector, { ISection } from "../SectionInjector";
import InputInjector from "../InputInjector";

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
      if (item.itemGroup === "section")
        return (
          <SectionInjector
            sectionType={item.itemType}
            config={item.items}
            formik={formik}
          />
        );

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

  if (!renderSection) return <></>;

  return <>{renderSectionsAndInputs()}</>;
};

export default Condition;
