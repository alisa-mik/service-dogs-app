
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
    name: string;
    birthDate: string;
    gender: string;
    breed: string;
    momName: string;
    active: boolean;
    level: string;
    status: string;
    image: string;
    assignedFamilyId: string;
    assignedFamilyName: string;
    updates: Update[];
    summary: string;
}
