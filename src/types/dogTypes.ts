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
    dogDetails?: DogDetailsForUpdate
}

export interface DogDetailsForUpdate {
    dogId: string;
    dogName: string;
    image: string;
}
export interface Dog {
    dogId: string;
    dogName: string;
    birthDate: number;
    gender: string | null;
    breed: string | null;
    color: string;
    // momDog: ParentDog;
    momDog: string;
    // dadDog: ParentDog;
    dadDog: string;
    active: boolean;
    dogStatus: string;
    image: string;
    assignedFamily: AssignedFamily;
    groupId: string | null;
    dropDate: string,
    dropReason: string,
    chipNumber: string,
    updates: Update[];
    summary: string;
    medicalInfo: string
}

export interface DogBasic  {
    dogId: string;
    dogName: string;
    dogStatus: string;
    active: boolean;
    groupId: string;
  };
  

export interface AddDogFormValues {
    dogName: string;
    birthDate: string;
    gender: string | null;
    breed: string | null;
    color: string;
    momDog: string | null;
    dadDog: string | null;
    groupId: string | null;
    assignedFamily: AssignedFamily | null;
    active: boolean;
    dogStatus: string;
    dropDate: string;
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
}



// export type ParentDog = {
//     dogId: string;
//     dogName: string;
// }