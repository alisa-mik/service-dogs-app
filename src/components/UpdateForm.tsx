import React, { useState } from "react";
import {
	TextField,
	Button,
	FormControl,
	FormGroup,
	FormControlLabel,
	Checkbox,
	Box,
	Typography,
} from "@mui/material";

interface UpdateFormProps {
	dogId: string;
}

const categoryOptions = ["Health", "Training", "Behavior", "Status"];

const UpdateForm = ({ dogId }: UpdateFormProps) => {
	const [content, setContent] = useState("");
	const [categories, setCategories] = useState<string[]>([]);

	const handleCategoryChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const { name, checked } = event.target;
		if (checked) {
			setCategories([...categories, name]);
		} else {
			setCategories(categories.filter((cat) => cat !== name));
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log({ dogId });

		// TODO: Implement submission logic
		setContent("");
		setCategories([]);
	};

	return (
		<Box
			component="form"
			onSubmit={handleSubmit}
			sx={{ marginTop: 4, marginBottom: 4 }}
		>
			<Typography variant="h5" gutterBottom>
				Add a New Update
			</Typography>
			<FormControl component="fieldset" sx={{ marginBottom: 2 }}>
				<FormGroup row>
					{categoryOptions.map((cat) => (
						<FormControlLabel
							key={cat}
							control={
								<Checkbox
									checked={categories.includes(cat)}
									onChange={handleCategoryChange}
									name={cat}
								/>
							}
							label={cat}
						/>
					))}
				</FormGroup>
			</FormControl>
			<TextField
				label="Update Content"
				multiline
				rows={4}
				fullWidth
				value={content}
				onChange={(e) => setContent(e.target.value)}
				variant="outlined"
				sx={{ marginBottom: 2 }}
			/>
			<Button type="submit" variant="contained" color="primary">
				Submit Update
			</Button>
		</Box>
	);
};

export default UpdateForm;
