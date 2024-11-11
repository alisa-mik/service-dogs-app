import { FormikProps } from "formik";
import { configType } from "./Form";
import Done from "./sections/Done";
import Common from "./sections/Common";
import Condition from "./sections/Condition";

export interface ISection {
  config: configType[];
  formik: FormikProps<{ [key: string]: any }>;
}

export type Section = "done" | "common" | "condition";

interface ISectionInjector {
  config: configType[];
  formik: FormikProps<{ [key: string]: any }>;
  sectionType: Section;
  itemProps?: { [key: string]: any };
}

const SectionInjector: React.FC<ISectionInjector> = ({
  formik,
  config,
  sectionType,
  itemProps = {},
}) => {
  const sectionsMap = {
    done: Done,
    common: Common,
    condition: Condition,
  };

  const Component = sectionsMap[sectionType] as any;

  return <Component config={config} formik={formik} {...itemProps} />;
};

export default SectionInjector;
