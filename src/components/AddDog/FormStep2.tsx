import React from "react";
import { FormItem, Input, Label } from "./FormStyles";
import { AddDogFormStepProps } from "../../types/dogTypes";

const FormStep2: React.FC<AddDogFormStepProps> = ({ formik }) => (
	<>
		<FormItem>
			<Label>צבע:</Label>
			<Input
				type="text"
				name="color"
				value={formik.values.color}
				onChange={formik.handleChange}
			/>
		</FormItem>
		<FormItem>
			<Label>שם האם:</Label>
			<Input
				type="text"
				name="momName"
				value={formik.values.momName}
				onChange={formik.handleChange}
			/>
		</FormItem>
		<FormItem>
			<Label>שם האב:</Label>
			<Input
				type="text"
				name="dadName"
				value={formik.values.dadName}
				onChange={formik.handleChange}
			/>
		</FormItem>
		<FormItem>
			<Label>קבוצה:</Label>
			<Input
				type="text"
				name="groupId"
				value={formik.values.groupId}
				onChange={formik.handleChange}
			/>
		</FormItem>
	</>
);

export default FormStep2;
