import { AddDogFormStepProps } from "../../types/dogTypes";
import { FormItem, Label } from "./FormStyles";
import { Input, Select, TextArea, Checkbox } from "../form/styledInputs";

const FormStep3: React.FC<AddDogFormStepProps> = ({ formik }) => (
  <>
    <FormItem>
      <div style={{ display: "flex", gap: "10px" }}>
        <Label>פעיל:</Label>
        <Checkbox
          type="checkbox"
          name="active"
          checked={formik.values.active}
          onChange={formik.handleChange}
        />
      </div>
    </FormItem>
    <FormItem>
      <Label>סטטוס:</Label>
      <Select
        name="dogStatus"
        value={formik.values.dogStatus}
        onChange={formik.handleChange}
      >
        <option value="" label="בחר סטטוס" />
        <option value="לפני אומנה">לפני אומנה</option>
        <option value="באומנה">באומנה</option>
        <option value="הכשרה">אימון מתקדם</option>
        <option value="עובד">עובד</option>
        <option value="בפנסיה">בפנסיה</option>
        <option value="נשר">נשר</option>
        <option value="עבר להרבעה">עבר להרבעה</option>
        <option value="מת">מת</option>
      </Select>
    </FormItem>

    {formik.values.dogStatus === "נשר" && (
      <>
        <FormItem>
          <Label>תאריך נשירה:</Label>
          <Input
            type="date"
            name="dropDate"
            value={formik.values.dropDate}
            onChange={formik.handleChange}
          />
        </FormItem>
        <FormItem>
          <Label>סיבת נשירה:</Label>
          <Input
            type="text"
            name="dropReason"
            value={formik.values.dropReason}
            onChange={formik.handleChange}
          />
        </FormItem>
      </>
    )}

    <FormItem>
      <Label>מספר שבב:</Label>
      <Input
        type="text"
        name="chipNumber"
        value={formik.values.chipNumber ?? ""}
        onChange={formik.handleChange}
      />
    </FormItem>
    <FormItem>
      <Label>מידע רפואי:</Label>
      <TextArea
        name="medicalInfo"
        value={formik.values.medicalInfo}
        onChange={formik.handleChange}
      />
    </FormItem>
  </>
);

export default FormStep3;
