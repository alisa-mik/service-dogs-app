export interface GearRequestContent {
  requestedItems: string[];
  comments?: string;
}

export interface FamilyAwayContent {
  startDate: number;
  endDate: number;
  comments?: string;
}

export interface MedicalUpdateContent {
  type: string;
  date: number;
  comments?: string;
}

export interface FoodRequestContent {
  foodType: string;
  comments?: string;
}

export interface FamilyNoticeContent {
  message: string;
}

// Now the union type:
export type UpdateContent =
  | GearRequestContent
  | FamilyAwayContent
  | MedicalUpdateContent
  | FoodRequestContent
  | FamilyNoticeContent;

export type UpdateType =
  | "gearRequest"
  | "familyAway"
  | "medicalUpdate"
  | "foodRequest"
  | "familyNotice";

export type StatusType = "Pending" | "Resolved";

export interface FamilyUpdate {
  updateId: string;
  familyId: string;
  dogId: string;
  dogName: string;
  dogGroupId: string;
  updateType: UpdateType;
  updateContent: UpdateContent;
  resolved: boolean;
  status?: StatusType;
  createdAt: number;
}
