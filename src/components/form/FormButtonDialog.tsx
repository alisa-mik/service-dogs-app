import React, { useState } from "react";
import { Button } from "../commonParts/Buttons";
import Form, { configType } from "../form/Form.tsx";
import CustomDialog from "../CustomDialog";
import { Icon } from "@mui/material";
import { noop } from "lodash";

type FormButtonDialogProps = {
  icon?: undefined | string;
  data: any;
  formType?: "steps" | "single";
  formConfig: configType[];
  buttonText: string;
  validate?: (values: { [key: string]: any }) => { [key: string]: string };
  onSubmit: (values: any) => void;
  onOpen?: () => void;
};

type Validate = {
  validate?: (values: { [key: string]: any }) => { [key: string]: string };
};

const FormButtonDialog: React.FC<FormButtonDialogProps> = ({
  icon,
  data,
  validate,
  onSubmit,
  buttonText,
  formConfig,
  formType = "single",
  onOpen = noop,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    onOpen();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (values: any) => {
    onSubmit(values);
    handleClose();
  };

  const renderButton = () => {
    if (icon) {
      return (
        <Icon
          sx={{ cursor: "pointer" }}
          baseClassName="material-icons-two-tone"
          onClick={handleOpen}
        >
          {icon}
        </Icon>
      );
    }

    return <Button onClick={handleOpen}>{buttonText}</Button>;
  };

  const validateProps: Validate = {};
  if (validate) validateProps.validate = validate;

  return (
    <>
      {renderButton()}
      <CustomDialog onClose={handleClose} open={open} title="הוספת משפחה">
        <Form
          formType={formType}
          config={formConfig}
          data={data}
          onSubmit={handleSubmit}
          {...validateProps}
        />
      </CustomDialog>
    </>
  );
};

export default FormButtonDialog;
