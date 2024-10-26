// AddProjectForm.tsx

import React from "react";
import { useFormik } from "formik";
import { v4 as uuidv4 } from "uuid";
import { apiClient, apiConfig } from "../config/apiConfig";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import styled from "styled-components";
import { refetchProjects } from "../store/projectsSlice";
import { Label } from "./commonParts/Labels";
import { Input, DateInput, TextArea } from "./form/styledInputs";
import { Button } from "./commonParts/Buttons";

const FormContainer = styled.form`
	direction: rtl;
	display: flex;
	flex-direction: column;
	gap: 20px;
	text-align: right;
	padding: 20px;
	background-color: #f9f9f9;
	border-radius: 8px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

const ErrorText = styled.div`
	color: red;
	font-size: 14px;
	margin-top: 5px;
`;

const validate = (values: { projectName: string; description: string; startDate: string; endDate: string }) => {
	const errors: { projectName?: string; startDate?: string; endDate?: string } = {};

	if (!values.projectName.trim()) {
		errors.projectName = "שם הפרויקט הוא שדה חובה";
	}

	return errors;
};

interface AddProjectFormProps {
	handleClose: () => void;
}

const AddProjectForm: React.FC<AddProjectFormProps> = ({ handleClose }) => {
	const dispatch = useDispatch<AppDispatch>();

	const formik = useFormik({
		initialValues: {
			projectName: "",
			description: "",
			startDate: "",
			endDate: "",
		},
		validate,
		onSubmit: async (values, { resetForm }) => {
			try {
				const projectId = uuidv4();

				await apiClient.post(apiConfig.addProject, {
					projectId,
					projectName: values.projectName,
					description: values.description,
					startDate: values.startDate,
					endDate: values.endDate,
				});

				resetForm();
				handleClose();
                console.log("new project created");
                
				dispatch(refetchProjects()); 
			} catch (error) {
				console.error("Error adding project:", error);
			}
		},
	});

	return (
		<FormContainer onSubmit={formik.handleSubmit}>
			<FormGroup>
				<Label htmlFor="projectName">שם פרויקט</Label>
				<Input
					id="projectName"
					name="projectName"
					value={formik.values.projectName}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					placeholder="שם פרויקט"
				/>
				{formik.touched.projectName && formik.errors.projectName && (
					<ErrorText>{formik.errors.projectName}</ErrorText>
				)}
			</FormGroup>

			<FormGroup>
				<Label htmlFor="description">תיאור</Label>
				<TextArea
					id="description"
					name="description"
                    rows={10}
					value={formik.values.description}
					onChange={formik.handleChange}
					placeholder="תיאור הפרויקט"
				/>
			</FormGroup>

			<FormGroup>
				<Label htmlFor="startDate">תאריך התחלה</Label>
				<DateInput
					id="startDate"
					name="startDate"
					type="date"
					value={formik.values.startDate}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
				/>
				{/* {formik.touched.startDate && formik.errors.startDate && (
					<ErrorText>{formik.errors.startDate}</ErrorText>
				)} */}
			</FormGroup>

			<FormGroup>
				<Label htmlFor="endDate">תאריך סיום</Label>
				<DateInput
					id="endDate"
					name="endDate"
					type="date"
					value={formik.values.endDate}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
				/>
				{/* {formik.touched.endDate && formik.errors.endDate && (
					<ErrorText>{formik.errors.endDate}</ErrorText>
				)} */}
			</FormGroup>

			<Button type="submit">הוסף פרויקט</Button>
		</FormContainer>
	);
};

export default AddProjectForm;
