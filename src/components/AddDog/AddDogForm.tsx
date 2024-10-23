import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { FormikProps, useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
	ButtonGroup,
	FormContainer,
	FormTitle,
	SuccessMessage,
} from "./FormStyles";
import FormStep1 from "./FormStep1.tsx";
import FormStep2 from "./FormStep2.tsx";
import FormStep3 from "./FormStep3.tsx";
import FormStep4 from "./FormStep4.tsx";
import { AddDogFormValues } from "../../types/dogTypes.ts";
import { AppDispatch } from "../../store/index.ts";
import { refetchDogs } from "../../store/dogsSlice.ts";
import { Button } from "../commonParts/Buttons.tsx";

const AddDogForm: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const [currentStep, setCurrentStep] = useState(1); // Track the current step
	const [formSubmitted, setFormSubmitted] = useState(false);

	const formik: FormikProps<AddDogFormValues> = useFormik<AddDogFormValues>({
		initialValues: {
			dogName: "",
			birthDate: "",
			gender: "",
			breed: "",
			color: "",
			momName: "",
			dadName: "",
			groupId: "",
			assignedFamilyId: "",
			active: true,
			dogStatus: "",
			dropDate: "",
			dropReason: "",
			chipNumber: "",
			medicalInfo: "",
		},
		onSubmit: async (values) => {
			const formattedValues = {
				...values,
				dogId: uuidv4(),
				birthDate: Math.floor(
					new Date(values.birthDate).getTime() / 1000
				),
			};

			try {
				const response = await axios.post(
					"https://q4anwwvawd.execute-api.eu-west-1.amazonaws.com/dev/add-dog",
					formattedValues,
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				);
				setFormSubmitted(true);
				dispatch(refetchDogs());
				return response.data;
			} catch (error) {
				if (axios.isAxiosError(error)) {
					console.log(error.response?.status);

					console.error("Error response data:", error.response?.data);
					if (error?.response?.status === 401) {
						navigate("/login");
						localStorage.clear();
					}
				} else {
					console.error("An unknown error occurred:", error);
				}
			}
		},
	});

	const nextStep = () => setCurrentStep((prevStep) => prevStep + 1);
	const prevStep = () => setCurrentStep((prevStep) => prevStep - 1);

	const renderStep = () => {
		switch (currentStep) {
			case 1:
				return <FormStep1 formik={formik} />;
			case 2:
				return <FormStep2 formik={formik} />;
			case 3:
				return <FormStep3 formik={formik} />;
			case 4:
				return <FormStep4 />;
			default:
				return null;
		}
	};

	return (
		<>
			<FormContainer>
				<form
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "10px",
					}}
					onSubmit={formik.handleSubmit}
				>
					<FormTitle>טופס הוספת כלב</FormTitle>
					{renderStep()}
					<ButtonGroup>
						{currentStep > 1 && (
							<Button type="button" onClick={prevStep}>
								חזור
							</Button>
						)}
						{currentStep < 4 && (
							<Button type="button" onClick={nextStep}>
								הבא
							</Button>
						)}
						{currentStep === 4 && (
							<Button type="submit">שלח</Button>
						)}
					</ButtonGroup>
				</form>
			</FormContainer>
			{formSubmitted && <SuccessMessage>כלב נוסף בהצלחה!</SuccessMessage>}
		</>
	);
};

export default AddDogForm;
