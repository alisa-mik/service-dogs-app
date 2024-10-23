import axios from "axios";
import { apiConfig } from "../config/apiConfig";
import { Button } from "./commonParts/Buttons";
import { useFormik } from "formik";
import { useState } from "react";
import { SuccessMessage } from "./AddDog/FormStyles";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { refetchDogById } from "../store/dogProfileSlice";
import styled from "styled-components";

interface EditSummaryFormProps {
	dogId: string;
	currentSummary: string;
	onClose: () => void;
}

const TextArea = styled.textarea`
	width: 100%;
	font-family: "Rubik";
	height: 120px;
	font-size: 16px;
	padding: 10px;
	border-radius: 8px;
	border: 1px solid #ccc;
	resize: vertical;
`;

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

export const FormTitle = styled.h2`
	margin: 0;
	text-align: center;
	color: #333;
`;

export default function EditSummaryForm({
	dogId,
	currentSummary,
	onClose,
}: EditSummaryFormProps) {
	const dispatch = useDispatch<AppDispatch>();
	const [formSubmitted, setFormSubmitted] = useState(false);

	const formik = useFormik({
		initialValues: {
			summary: currentSummary,
		},
		onSubmit: async (values) => {
			try {
				const response = await axios.put(
					`${apiConfig.editDog}/${dogId}`,
					{
						summary: values.summary,
					},
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				);

				if (response.status !== 200) {
					throw new Error("Failed to update summary");
				}
				setFormSubmitted(true);
				onClose();
				dispatch(refetchDogById(dogId));
			} catch (error) {
				console.error(error);
			}
		},
	});

	return (
		<div>
			<FormContainer onSubmit={formik.handleSubmit}>
				<FormTitle>התרשמות</FormTitle>
				<div>
					<TextArea
						name="summary"
						value={formik.values.summary}
						onChange={formik.handleChange}
						rows={5}
					/>
				</div>
				<div>
					<Button type="submit">שלח</Button>
				</div>
			</FormContainer>
			{formSubmitted && (
				<SuccessMessage>התרשמות עודכנה בהצלחה! </SuccessMessage>
			)}
		</div>
	);
}
