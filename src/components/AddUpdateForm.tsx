import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { apiConfig } from "../config/apiConfig";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { refetchDogById } from "../store/dogProfileSlice";

// List of categories (you can change these to what you need)
const availableCategories = [
	{ name: "Training", color: "#FF6347" }, // Tomato
	{ name: "Health", color: "#4682B4" }, // SteelBlue
	{ name: "Behavior", color: "#32CD32" }, // LimeGreen
];

interface AddUpdateFormProps {
	dogId: string;
	handleClose: () => void;
}

// Custom validation function without Yup
const validate = (values: { content: string; timestamp: string }) => {
	const errors: { content?: string; timestamp?: string } = {};

	if (!values.content) {
		errors.content = "שדה התוכן הוא שדה חובה";
	}

	if (!values.timestamp) {
		errors.timestamp = "יש לבחור תאריך ושעה";
	}

	return errors;
};

const AddUpdateForm: React.FC<AddUpdateFormProps> = ({
	dogId,
	handleClose,
}) => {
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const dispatch = useDispatch<AppDispatch>();

	const formik = useFormik({
		initialValues: {
			content: "",
			timestamp: new Date().toISOString(),
		},
		validate, // Custom validate function
		onSubmit: async (values, { resetForm }) => {
			try {
				const updateId = uuidv4();

				// Make a POST request to add the update
				await axios.post(
					apiConfig.addUpdate, // Replace with your API endpoint
					{
						updateId,
						dogId, // Pass the correct dogId
						content: values.content,
						categories: selectedCategories,
						timestamp: values.timestamp,
					},
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				);

				resetForm();
				handleClose();
				dispatch(refetchDogById(dogId));
			} catch (error) {
				console.error("Error adding update:", error);
			}
		},
	});

	// Toggle the category selection
	const toggleCategory = (categoryName: string) => {
		if (selectedCategories.includes(categoryName)) {
			setSelectedCategories(
				selectedCategories.filter((cat) => cat !== categoryName)
			);
		} else {
			setSelectedCategories([...selectedCategories, categoryName]);
		}
	};

	return (
		<form
			onSubmit={formik.handleSubmit}
			style={{ direction: "rtl", textAlign: "right" }}
		>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "20px",
				}}
			>
				{/* Content input (textarea to make it larger) */}
				<label htmlFor="content">תוכן</label>
				<textarea
					id="content"
					name="content"
					value={formik.values.content}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					style={{
						width: "100%",
						height: "120px", // Larger height for textarea
						fontSize: "16px",
						padding: "10px",
						borderRadius: "8px",
						border: "1px solid gray",
					}}
				/>
				{formik.touched.content && formik.errors.content && (
					<div style={{ color: "red" }}>{formik.errors.content}</div>
				)}

				{/* Categories selection */}
				<div
					style={{
						display: "flex",
						justifyContent: "space-around",
						marginTop: "10px",
					}}
				>
					{availableCategories.map((category) => (
						<div
							key={category.name}
							onClick={() => toggleCategory(category.name)}
							style={{
								padding: "10px 20px",
								borderRadius: "8px",
								cursor: "pointer",
								backgroundColor: selectedCategories.includes(
									category.name
								)
									? category.color
									: "gray",
								color: "white",
								textAlign: "center",
							}}
						>
							{category.name}
						</div>
					))}
				</div>

				{/* Timestamp input */}
				<label htmlFor="timestamp">תאריך ושעה</label>
				<input
					id="timestamp"
					name="timestamp"
					type="datetime-local"
					value={formik.values.timestamp}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					style={{
						width: "100%",
						fontSize: "16px",
						padding: "10px",
						borderRadius: "8px",
						border: "1px solid gray",
					}}
				/>
				{formik.touched.timestamp && formik.errors.timestamp && (
					<div style={{ color: "red" }}>
						{formik.errors.timestamp}
					</div>
				)}

				{/* Submit Button */}
				<button
					type="submit"
					style={{
						backgroundColor: "#4CAF50",
						color: "white",
						padding: "10px 20px",
						borderRadius: "8px",
						border: "none",
						cursor: "pointer",
					}}
				>
					הוסף עדכון
				</button>
			</div>
		</form>
	);
};

export default AddUpdateForm;
