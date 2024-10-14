import React, { useState, ChangeEvent, FormEvent } from "react";
import {
	TextField,
	Button,
	Box,
	Select,
	MenuItem,
	InputLabel,
	FormControl,
	SelectChangeEvent,
} from "@mui/material";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

// Define the dog form state interface
interface DogFormState {
	name: string;
	breed: string;
	birthdate: string;
	momName: string;
	gender: string;
}

const AddDogForm: React.FC = () => {
	const [dogData, setDogData] = useState<DogFormState>({
		name: "",
		breed: "",
		birthdate: "",
		momName: "",
		gender: "",
	});

	const [formSubmitted, setFormSubmitted] = useState(false); // To track if form is submitted

	// Handle form input changes for TextField (ChangeEvent)
	const handleTextFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setDogData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	// Handle changes for Select component (SelectChangeEvent)
	const handleSelectChange = (e: SelectChangeEvent<string>) => {
		const { name, value } = e.target;
		setDogData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const dogId = uuidv4(); // Generate a unique dog ID using uuid
		console.log("Generated dogId:", dogId);

		try {
			const response = await axios.post(
				"https://q4anwwvawd.execute-api.eu-west-1.amazonaws.com/dev/AddDogFunction", // Replace with your actual API Gateway endpoint
				{ ...dogData, dogId } // Add the generated dogId to the payload
			);
			console.log("Dog added successfully:", response.data);

			// Indicate successful form submission
			setFormSubmitted(true);

			// Reset form after submission
			setDogData({
				name: "",
				breed: "",
				birthdate: "",
				momName: "",
				gender: "",
			});
		} catch (error) {
			console.error("Error adding dog:", error);
		}
	};

	return (
		<Box mt={2}>
			<form onSubmit={handleSubmit}>
				<TextField
					fullWidth
					label="Dog Name"
					name="name"
					value={dogData.name}
					onChange={handleTextFieldChange}
					margin="normal"
					required
				/>
				<TextField
					fullWidth
					label="Breed"
					name="breed"
					value={dogData.breed}
					onChange={handleTextFieldChange}
					margin="normal"
					required
				/>
				<TextField
					fullWidth
					type="date"
					label="Birthdate"
					name="birthdate"
					value={dogData.birthdate}
					onChange={handleTextFieldChange}
					margin="normal"
					InputLabelProps={{ shrink: true }}
					required
				/>
				<TextField
					fullWidth
					label="Mom's Name"
					name="momName"
					value={dogData.momName}
					onChange={handleTextFieldChange}
					margin="normal"
					required
				/>
				<FormControl fullWidth margin="normal">
					<InputLabel id="gender-label">Gender</InputLabel>
					<Select
						labelId="gender-label"
						label="Gender"
						name="gender"
						value={dogData.gender}
						onChange={handleSelectChange}
						required
					>
						<MenuItem value="male">Male</MenuItem>
						<MenuItem value="female">Female</MenuItem>
					</Select>
				</FormControl>
				<Button
					variant="contained"
					color="primary"
					type="submit"
					fullWidth
					style={{ marginTop: "16px" }}
				>
					Submit
				</Button>
			</form>
			{formSubmitted && (
				<Box mb={2} style={{ color: "green" }}>
					Dog added successfully!
				</Box>
			)}
		</Box>
	);
};

export default AddDogForm;
