export interface GearRequestContent {
  leash: boolean;
  collar: boolean;
  easywalk: boolean;
  bone: boolean;
  wastebags: boolean;
  other: boolean;
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

export interface OtherContent {
  comments: string;
}

// Now the union type:
export type UpdateContent =
  | GearRequestContent
  | FamilyAwayContent
  | MedicalUpdateContent
  | FoodRequestContent
  | OtherContent;

export type UpdateType =
  | "gearRequest"
  | "familyAway"
  | "medicalUpdate"
  | "foodRequest"
  | "other";

export type StatusType = "Pending" | "Resolved";

export interface FamilyUpdate {
  updateId: string;
  familyId: string;
  familyName: string;
  contactName: string;
  dogId: string;
  dogName: string;
  groupId: string;
  updateType: UpdateType;
  updateContent: UpdateContent;
  resolved: boolean;
  status?: StatusType;
  createdAt: number;
}

export interface RequestInfo {
  dogId: string;
  dogName: string;
  familyId: string;
  contactName: string;
  familyName: string;
  groupId: string;
  createdAt: number;
  resolved: boolean;
  comments?: string;
}

export type GearType =
  | "leash"
  | "collar"
  | "easywalk"
  | "bone"
  | "wastebags"
  | "other";

export type GearItemDetail = {
  allCount: number;
  pendingCount: number;
  requests: RequestInfo[];
};

export type GearSummary = Record<GearType, GearItemDetail>;
