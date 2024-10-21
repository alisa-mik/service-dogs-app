
export interface Author {
    userId: string;
    userName: string;
}

export interface Update {
    id: string;
    timestamp: string;
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