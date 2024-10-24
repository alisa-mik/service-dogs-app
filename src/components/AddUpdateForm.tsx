import React, { useState } from "react";
import { useFormik } from "formik";
import { v4 as uuidv4 } from "uuid";
import { apiClient, apiConfig } from "../config/apiConfig";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import styled from "styled-components";

import { categoriesTranslation, CATEGORY_COLORS } from "../config/categories";
import { BROWN_DARK, YELLOW, YELLOW_DARKER } from "../config/colors";
import { fetchUpdatesByDogId } from "../store/updatesByDogIdSlice";

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

const Label = styled.label`
	display: block;
	font-weight: bold;
`;

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

const CategoriesContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
`;

const CategoryTag = styled.span<{ selected: boolean; color: string }>`
	padding: 8px 16px;
	border-radius: 20px;
	cursor: pointer;
	user-select: none;
	font-size: 14px;
	color: ${({ selected }) => (selected ? "#fff" : "#333")};
	background-color: ${({ selected, color }) =>
		selected ? color : "#e0e0e0"};
	transition: background-color 0.3s, color 0.3s;

	&:hover {
		opacity: 0.8;
	}
`;

const DateInput = styled.input`
	width: 20%;
	padding: 10px;
	font-size: 16px;
	border-radius: 8px;
	border: 1px solid #ccc;
`;

const SubmitButton = styled.button`
	width: 100%;
	padding: 12px;
	background-color: ${YELLOW};
	color: ${BROWN_DARK};
	font-size: 16px;
	font-family: "Rubik";
	border: none;
	border-radius: 8px;
	cursor: pointer;

	&:hover {
		background-color: ${YELLOW_DARKER};
	}
`;

const ErrorText = styled.div`
	color: red;
	font-size: 14px;
	margin-top: 5px;
`;

const validate = (values: { content: string; date: string }) => {
	const errors: { content?: string; date?: string } = {};

	if (!values.content.trim()) {
		errors.content = "שדה התוכן הוא שדה חובה";
	}

	if (!values.date) {
		errors.date = "יש לבחור תאריך";
	}

	return errors;
};

interface AddUpdateFormProps {
	dogId: string;
	handleClose: () => void;
}

const AddUpdateForm: React.FC<AddUpdateFormProps> = ({
	dogId,
	handleClose,
}) => {
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const dispatch = useDispatch<AppDispatch>();

	const formik = useFormik({
		initialValues: {
			content: "",
			date: new Date().toISOString().split("T")[0],
		},
		validate,
		onSubmit: async (values, { resetForm }) => {
			try {
				const updateId = uuidv4();
				console.log({
					updateId: updateId,
					dogId: dogId,
					content: values.content,
					categories: selectedCategories,
					date: values.date,
				});

				await apiClient.post(apiConfig.addUpdate, {
					updateId: updateId,
					dogId: dogId,
					content: values.content,
					categories: selectedCategories,
					date: values.date,
				});

				resetForm();
				handleClose();
				dispatch(fetchUpdatesByDogId(dogId));
			} catch (error) {
				console.error("Error adding update:", error);
			}
		},
	});

	const toggleCategory = (categoryName: string) => {
		setSelectedCategories((prev) =>
			prev.includes(categoryName)
				? prev.filter((cat) => cat !== categoryName)
				: [...prev, categoryName]
		);
	};

	return (
		<FormContainer onSubmit={formik.handleSubmit}>
			<FormGroup>
				<Label htmlFor="content">הוספת עדכון חדש</Label>
				<TextArea
					id="content"
					name="content"
					value={formik.values.content}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					placeholder="הכנס תוכן כאן..."
				/>
				{formik.touched.content && formik.errors.content && (
					<ErrorText>{formik.errors.content}</ErrorText>
				)}
			</FormGroup>

			<FormGroup>
				<Label>קטגוריות</Label>
				<CategoriesContainer>
					{Object.entries(CATEGORY_COLORS).map(([name, color]) => (
						<CategoryTag
							key={name}
							selected={selectedCategories.includes(name)}
							color={color}
							onClick={() => toggleCategory(name)}
						>
							{categoriesTranslation[name]}
						</CategoryTag>
					))}
				</CategoriesContainer>
			</FormGroup>

			{/* Date Selection */}
			<FormGroup>
				<Label htmlFor="date">תאריך</Label>
				<DateInput
					id="date"
					name="date"
					type="date"
					value={formik.values.date}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
				/>
				{formik.touched.date && formik.errors.date && (
					<ErrorText>{formik.errors.date}</ErrorText>
				)}
			</FormGroup>

			{/* Submit Button */}
			<SubmitButton type="submit">הוסף עדכון</SubmitButton>
		</FormContainer>
	);
};

export default AddUpdateForm;
