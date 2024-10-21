import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const AddDogForm: React.FC = () => {
	const navigate = useNavigate();
	const [currentStep, setCurrentStep] = useState(1); // Track the current step
	const [formSubmitted, setFormSubmitted] = useState(false);

	const formik = useFormik({
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

			console.log({ formattedValues });

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
				console.log("Dog added successfully:", response.data);
				return response.data;
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} catch (error: any) {
				console.error("Error adding dog:", error);
				if (error?.response?.status === 401) {
					navigate("/login");
					localStorage.clear();
				}
			}
		},
	});

	// Function to go to the next step
	const nextStep = () => setCurrentStep((prevStep) => prevStep + 1);

	// Function to go to the previous step
	const prevStep = () => setCurrentStep((prevStep) => prevStep - 1);

	// Render the step form based on the current step
	const renderStep = () => {
		switch (currentStep) {
			case 1:
				return (
					<>
						<div>
							<label>שם הכלב:</label>
							<input
								type="text"
								name="dogName"
								value={formik.values.dogName}
								onChange={formik.handleChange}
								required
							/>
						</div>
						<div>
							<label>תאריך לידה:</label>
							<input
								type="date"
								name="birthDate"
								value={formik.values.birthDate}
								onChange={formik.handleChange}
								// required
							/>
						</div>
						<div>
							<label>מין:</label>
							<select
								name="gender"
								value={formik.values.gender}
								onChange={formik.handleChange}
								// required
							>
								<option value="" label="בחר מין" />
								<option value="זכר">זכר</option>
								<option value="נקבה">נקבה</option>
							</select>
						</div>
						<div>
							<label>גזע:</label>
							<input
								type="text"
								name="breed"
								value={formik.values.breed}
								onChange={formik.handleChange}
								// required
							/>
						</div>
					</>
				);
			case 2:
				return (
					<>
						<div>
							<label>צבע:</label>
							<input
								type="text"
								name="color"
								value={formik.values.color}
								onChange={formik.handleChange}
								// required
							/>
						</div>
						<div>
							<label>שם האם:</label>
							<input
								type="text"
								name="momName"
								value={formik.values.momName}
								onChange={formik.handleChange}
								// required
							/>
						</div>
						<div>
							<label>שם האב:</label>
							<input
								type="text"
								name="dadName"
								value={formik.values.dadName}
								onChange={formik.handleChange}
								// required
							/>
						</div>
						<div>
							<label>קבוצה:</label>
							<input
								type="text"
								name="groupId"
								value={formik.values.groupId}
								onChange={formik.handleChange}
							/>
						</div>
						<div>
							<label>משפחת אומנה:</label>
							<input
								type="text"
								name="assignedFamily"
								value={formik.values.assignedFamilyId}
								onChange={formik.handleChange}
							/>
						</div>
					</>
				);
			case 3:
				return (
					<>
						<div>
							<label>פעיל:</label>
							<input
								type="checkbox"
								name="active"
								checked={formik.values.active}
								onChange={formik.handleChange}
							/>
						</div>
						<div>
							<label>סטטוס:</label>
							<select
								name="dogStatus"
								value={formik.values.dogStatus}
								onChange={formik.handleChange}
								// required
							>
								<option value="" label="בחר סטטוס" />
								<option value="לפני אומנה">לפני אומנה</option>
								<option value="באומנה">באומנה</option>
								<option value="אימון מתקדם">אימון מתקדם</option>
								<option value="עובד">עובד</option>
								<option value="בפנסיה">בפנסיה</option>
								<option value="נשר">נשר</option>
							</select>
						</div>

						{formik.values.dogStatus === "נשר" && (
							<>
								<div>
									<label>תאריך נשירה:</label>
									<input
										type="date"
										name="dropDate"
										value={formik.values.dropDate}
										onChange={formik.handleChange}
										// required
									/>
								</div>
								<div>
									<label>סיבת נשירה:</label>
									<input
										type="text"
										name="dropReason"
										value={formik.values.dropReason}
										onChange={formik.handleChange}
									/>
								</div>
							</>
						)}

						<div>
							<label>מספר שבב:</label>
							<input
								type="text"
								name="chipNumber"
								value={formik.values.chipNumber}
								onChange={formik.handleChange}
								required
							/>
						</div>
						<div>
							<label>מידע רפואי:</label>
							<textarea
								name="medicalInfo"
								value={formik.values.medicalInfo}
								onChange={formik.handleChange}
							/>
						</div>
					</>
				);
			case 4:
				return (
					<>
						<h3>אישור נתונים</h3>
						<p>האם ברצונך לשלוח את כל הנתונים?</p>
						<div>
							<button type="submit">שלח</button>
						</div>
					</>
				);
			default:
				return null;
		}
	};

	return (
		<>
			<div style={{ direction: "rtl" }}>
				<form onSubmit={formik.handleSubmit}>
					{renderStep()}

					<div>
						{currentStep > 1 && (
							<button type="button" onClick={prevStep}>
								חזור
							</button>
						)}
						{currentStep < 4 && (
							<button type="button" onClick={nextStep}>
								הבא
							</button>
						)}
					</div>
				</form>
			</div>

			{formSubmitted && (
				<div style={{ color: "green" }}>כלב נוסף בהצלחה!</div>
			)}
		</>
	);
};

export default AddDogForm;
