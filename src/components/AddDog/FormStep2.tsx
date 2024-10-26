import React, { useEffect, useMemo } from "react";
import { FormItem, Label } from "./FormStyles";
import { Input, Select } from "../form/styledInputs";
import {
  AddDogFormStepProps,
  AddDogFormValues,
  ParentDog,
} from "../../types/dogTypes";
import { mockDadDogs, mockMomDogs } from "../../config/mockParentDogs";
import { useSelector } from "react-redux";
import { selectProjects } from "../../store/projectsSlice";
import { FormikProps } from "formik";

type OptionType = ParentDog | { projectId: string; projectName: string };

type FieldName = "momDog" | "dadDog" | "assignedProject";

const FormStep2: React.FC<AddDogFormStepProps> = ({ formik }) => {
  const handleSelectChange =
    <T extends OptionType>(
      fieldName: FieldName,
      optionsArray: T[],
      formik: FormikProps<AddDogFormValues>
    ) =>
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedOption = optionsArray.find(
        (option) =>
          ("dogId" in option && option.dogId === event.target.value) ||
          ("projectId" in option && option.projectId === event.target.value)
      );

      if (selectedOption) {
        formik.setFieldValue(fieldName, selectedOption);
      } else {
        formik.setFieldValue(fieldName, null);
      }
    };

  const projects = useSelector(selectProjects);

  const modifiedProjects = useMemo(
    () =>
      projects.map(({ projectId, projectName }) => ({
        projectId,
        projectName,
      })),
    [projects]
  );

  return (
    <>
      <FormItem>
        <Label>אם:</Label>
        <Select
          name="momDog"
          value={formik.values.momDog ? formik.values.momDog.dogId : ""}
          onChange={handleSelectChange("momDog", mockMomDogs, formik)}
        >
          <option value="" label="בחר אם" />
          {mockMomDogs.map((momDog) => (
            <option key={momDog.dogId} value={momDog.dogId}>
              {momDog.dogName}
            </option>
          ))}
        </Select>
      </FormItem>
      <FormItem>
        <Label>אב:</Label>
        <Select
          name="dadDog"
          value={formik.values.dadDog ? formik.values.dadDog.dogId : ""}
          onChange={handleSelectChange("dadDog", mockDadDogs, formik)}
        >
          <option value="" label="בחר אב" />
          {mockDadDogs.map((dadDog) => (
            <option key={dadDog.dogId} value={dadDog.dogId}>
              {dadDog.dogName}
            </option>
          ))}
        </Select>
      </FormItem>
      <FormItem>
        <Label>פרויקט:</Label>
        <Select
          name="assignedProject"
          value={
            formik.values.assignedProject
              ? formik.values.assignedProject.projectId
              : ""
          }
          onChange={handleSelectChange(
            "assignedProject",
            modifiedProjects,
            formik
          )}
        >
          <option value="" label="בחר פרויקט" />
          {modifiedProjects.map(
            (project: { projectId: string; projectName: string }) => (
              <option key={project.projectId} value={project.projectId}>
                {project.projectName}
              </option>
            )
          )}
        </Select>
      </FormItem>
      <FormItem>
        <Label>קבוצה:</Label>
        <Input
          type="text"
          name="groupId"
          value={formik.values.groupId ?? ""}
          onChange={formik.handleChange}
        />
      </FormItem>
    </>
  );
};

export default FormStep2;
