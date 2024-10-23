import { FormikProps } from "formik";

export interface Author {
    userId: string;
    userName: string;
}

export interface Update {
    dogId: string;
    updateId: string;
    date: string;
    author: Author;
    categories: string[];
    content: string;
}

export interface Dog {
    dogId: string;
    dogName: string;
    birthDate: number;
    gender: string;
    breed: string;
    color: string;
    momName: string;
    dadName: string;
    groupId: string;
    active: boolean;
    // level: string;
    dogStatus: string;
    image: string;
    assignedFamilyId: string;
    dropDate: number,
    dropReason: string,
    chipNumber: string,
    medicalInfo: string,
    updates: Update[];
    summary: string;
}

export interface AddDogFormValues {
    dogName: string;
    birthDate: string;
    gender: string;
    breed: string;
    color: string;
    momName: string;
    dadName: string;
    groupId: string;
    assignedFamilyId: string;
    active: boolean;
    dogStatus: string;
    dropDate: string;
    dropReason: string;
    chipNumber: string;
    medicalInfo: string;
}

export interface AddDogFormStepProps {
    formik: FormikProps<AddDogFormValues>; // Explicitly type formik
}
