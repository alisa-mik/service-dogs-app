import React from "react";
import { FormItem, Label } from "./FormStyles";
import { Input } from "../form/styledInputs";
import { AddDogFormStepProps } from "../../types/dogTypes";

const FormStep2: React.FC<AddDogFormStepProps> = ({ formik }) => {
  return (
    <>
      <FormItem>
        <Label>אם:</Label>
        <Input
          type="text"
          name="momDog"
          value={formik.values.momDog ?? ""}
          onChange={formik.handleChange}
        />
      </FormItem>
      <FormItem>
        <Label>אב:</Label>
        <Input
          type="text"
          name="dadDog"
          value={formik.values.dadDog ?? ""}
          onChange={formik.handleChange}
        />
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
