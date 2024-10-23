// src/components/DogUpdates.tsx
import { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import AddUpdateModal from "../components/AddUpdateModal";
import styled from "styled-components";
import { SquareButton } from "../components/commonParts/Buttons";
import { Label, WidgetTitle } from "../components/commonParts/Labels";
import UpdateCard from "../components/UpdateCard";
import CategoryFilter from "../components/UpdateCategoriesFilter";
// import { categoryColors } from "../config/categoryColors";

const WidgetHeader = styled.div`
	height: 50px;
	width: 100%;
	display: flex;
	flex-direction: row;
	direction: rtl;
	justify-content: space-between;
	align-items: center;
	padding: 0 10px;
	background-color: #fff;
	border-bottom: 1px solid #ddd;
`;

const Body = styled.div`
	flex: 1;
	padding: 10px;
	display: flex;
	flex-direction: column;
	text-align: right;
	gap: 10px;
	width: 100%;
	overflow: auto;
`;

export default function DogUpdates() {
	const { updates } = useSelector((state: RootState) => state.updatesByDogId);
	const { dog } = useSelector((state: RootState) => state.dogProfile);
	const [open, setOpen] = useState(false);

	// Initialize selectedCategories from localStorage or default to empty array
	const [selectedCategories, setSelectedCategories] = useState<string[]>(
		() => {
			const stored = localStorage.getItem("selectedCategories");
			return stored ? JSON.parse(stored) : [];
		}
	);

	const { dogId } = dog;

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	// Extract unique categories
	const categories = useMemo(() => {
		const uniqueCategories = new Set<string>();
		updates.forEach((update) => {
			if (Array.isArray(update.categories)) {
				update.categories.forEach((cat) => uniqueCategories.add(cat));
			}
		});
		return Array.from(uniqueCategories);
	}, [updates]);

	// Filter updates based on selected categories
	const filteredUpdates = useMemo(() => {
		if (selectedCategories.length === 0) {
			return updates;
		}
		return updates.filter(
			(update) =>
				Array.isArray(update.categories) &&
				update.categories.some((cat) =>
					selectedCategories.includes(cat)
				)
		);
	}, [updates, selectedCategories]);

	// Persist selectedCategories to localStorage
	useEffect(() => {
		localStorage.setItem(
			"selectedCategories",
			JSON.stringify(selectedCategories)
		);
	}, [selectedCategories]);

	if (!dog) return <div>No dog</div>;

	return (
		<>
			<WidgetHeader>
				<WidgetTitle>עדכונים</WidgetTitle>
				<SquareButton padding="0px" weight={500} onClick={handleOpen}>
					<Label style={{ cursor: "pointer" }}>+</Label>
				</SquareButton>
			</WidgetHeader>

			<CategoryFilter
				categories={categories}
				selectedCategories={selectedCategories}
				onChange={setSelectedCategories}
			/>

			<Body>
				{filteredUpdates.length > 0 ? (
					filteredUpdates.map((update) => (
						<UpdateCard key={update.updateId} update={update} />
					))
				) : (
					<div>No updates available for the selected category.</div>
				)}
			</Body>

			<AddUpdateModal
				dogId={dogId}
				open={open}
				handleClose={handleClose}
			/>
		</>
	);
}
