import { FormItem, Label } from "./FormStyles";
import { AddDogFormStepProps } from "../../types/dogTypes";
import { Input, Select } from "../form/styledInputs";

const FormStep1: React.FC<AddDogFormStepProps> = ({ formik }) => (
	<>
		<FormItem>
			<Label>שם הכלב:</Label>
			<Input
				type="text"
				name="dogName"
				value={formik.values.dogName}
				onChange={formik.handleChange}
				required
			/>
		</FormItem>
		<FormItem>
			<Label>תאריך לידה:</Label>
			<Input
				type="date"
				name="birthDate"
				value={formik.values.birthDate}
				onChange={formik.handleChange}
				style={{ width: "150px" }}
			/>
		</FormItem>
		<FormItem>
			<Label>מין:</Label>
			<Select
				name="gender"
				value={formik.values.gender ?? ''}
				onChange={formik.handleChange}
			>
				<option value="" label="בחר מין" />
				<option value="זכר">זכר</option>
				<option value="נקבה">נקבה</option>
			</Select>
		</FormItem>
		<FormItem>
			<Label>גזע:</Label>
			<Input
				type="text"
				name="breed"
				value={formik.values.breed ?? ''}
				onChange={formik.handleChange}
			/>
		</FormItem>
		<FormItem>
			<Label>צבע:</Label>
			<Input
				type="text"
				name="color"
				value={formik.values.color}
				onChange={formik.handleChange}
			/>
		</FormItem>
	</>
);

export default FormStep1;