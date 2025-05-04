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
  date: number;
  "vaccine-2": boolean;
  "vaccine-3": boolean;
  "rabies-1": boolean;
  "rabies-2": boolean;
  worms: boolean;
  bravecto: boolean;
  chip: boolean;
  spay: boolean;
  other: boolean;
  comments: string;
}

export type FoodType = "salmon" | "bison" | "unknown";

export interface FoodRequestContent {
  foodType: FoodType;
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
  updateId: string;
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

export type RequestItemDetail = {
  allCount: number;
  pendingCount: number;
  requests: RequestInfo[];
};

export type GearSummary = Record<GearType, RequestItemDetail>;

export type FoodSummary = Record<FoodType, RequestItemDetail>;
