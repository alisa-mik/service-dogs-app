import { Dog } from "../types/dogTypes";

export const dog: Dog = {
    dogId: "dog_005",
    name: "Rocky",
    birthDate: "2019-03-30",
    gender: "Male",
    breed: "Boxer",
    active: false,
    level: "basic",
    status: "Dropped",
    momName: "Sadie",
    image: "https://images.dog.ceo/breeds/hound-basset/n02088238_9960.jpg",
    assignedFamilyId: "family_005",
    assignedFamilyName: "Taylor Family",
    updates: [
        {
            id: "1234",
            timestamp: "2019-05-30T13:00:00Z",
            author: {
                userId: "admin_001",
                userName: "Admin Alice",
            },
            categories: [ "Training" ],
            content: "Rocky began basic training.",
        },
        {
            id: "39499",
            timestamp: "2019-08-15T15:30:00Z",
            author: {
                userId: "family_005",
                userName: "Taylor Family",
            },
            categories: [ "Behavior" ],
            content:
                "Rocky is displaying aggressive behavior towards other dogs.",
        },
        {
            id: "949857",
            timestamp: "2019-09-20T10:00:00Z",
            author: {
                userId: "admin_002",
                userName: "Admin Bob",
            },
            categories: [ "Status" ],
            content:
                "Rocky has been dropped from the program due to behavior issues.",
        },
    ],
    summary: "lovely dog. All in one",
};