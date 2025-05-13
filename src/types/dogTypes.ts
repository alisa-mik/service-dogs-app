import { FormikProps } from "formik";
import { Family } from "../store/familiesSlice";

export interface Author {
  userId: string;
  userName: string;
}

export interface Update {
  dogId?: string;
  updateId: string;
  date: number;
  author?: Author;
  content: string;
  groupId?: string;
  categories?: string[];
  attendance?: string[];
  dogDetails?: DogDetailsForUpdate;
}

export interface DogDetailsForUpdate {
  dogId: string;
  dogName: string;
  image: string;
}

export interface DogBasic {
  dogId: string;
  dogName: string;
  gender: string;
  breed: string;
  birthDate: number;
  assignedFamily: string;
  dogStatus: string;
  active: boolean;
  groupId: string;
}

export interface DogWithFamily extends DogBasic {
  family: Family;
}
export interface Dog extends DogBasic {
  color: string;
  momDog: string;
  dadDog: string;
  image: string;
  dropDate: number;
  dropReason: string;
  chipNumber: string;
  medicalInfo: MedicalInfo;
  summary?: string;
}

export interface MedicalInfo {
  scheduled: number;
  reason: string;
  bp: number;
  "vaccine-1": number;
  "vaccine-2": number;
  "vaccine-3": number;
  "rabies-1": number;
  "rabies-2": number;
  worms: number;
  bravecto: number;
  chip: number;
  spay: number;
}

export interface AddDogFormValues {
  dogName: string;
  birthDate: number;
  gender: string | null;
  breed: string | null;
  color: string;
  momDog: string | null;
  dadDog: string | null;
  groupId: string | null;
  assignedFamily: AssignedFamily | null;
  active: boolean;
  dogStatus: string;
  dropDate: number;
  dropReason: string;
  chipNumber: string | null;
  summary: string | null;
  medicalInfo: string;
}

export interface AddDogFormStepProps {
  formik: FormikProps<AddDogFormValues>;
}

export type AssignedFamily = {
  familyId: string;
  familyName: string;
};
