import {
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import Drawer from "@mui/material/Drawer";
import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { TOP_BAR_HIGHT } from "../config/constants";
import styled from "styled-components";

interface IappNav {
	open: boolean;
	onClose: () => void;
}

const StyledLink = styled(Link)`
	width: 100%;
`;

export default function AppNavigation({ open, onClose }: IappNav) {
	const renderItems = (): ReactElement[] => {
		const navigationMap = [
			{
				label: "ראשי",
				icon: <MailIcon />,
				navigateTo: "main",
			},
			{
				label: "כלבים",
				icon: <MailIcon />,
				navigateTo: "dogs",
			},
			{
				label: "משפחות",
				icon: <MailIcon />,
				navigateTo: "family",
			},
		];

		return navigationMap.map(({ icon, label, navigateTo }) => {
			return (
				<ListItem
					key={label}
					disablePadding
					sx={{ direction: "rtl", width: "100%" }}
				>
					<StyledLink to={navigateTo} onClick={onClose}>
						<ListItemButton>
							<ListItemIcon sx={{ minWidth: 40 }}>
								{icon}
							</ListItemIcon>
							<ListItemText
								primary={label}
								sx={{ textAlign: "start" }}
							/>
						</ListItemButton>
					</StyledLink>
				</ListItem>
			);
		});
	};

	return (
		<Drawer
			open={open}
			anchor={"right"}
			ModalProps={{ onClose }}
			PaperProps={{ sx: { top: TOP_BAR_HIGHT } }}
		>
			<List sx={{ width: 200 }}>{renderItems()}</List>
		</Drawer>
	);
}
