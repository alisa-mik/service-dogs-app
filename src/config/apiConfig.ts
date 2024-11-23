import axios from "axios";

export const apiClient =
    axios.create({
        baseURL: "https://q4anwwvawd.execute-api.eu-west-1.amazonaws.com/dev",
        timeout: 5000, // Request timeout
        headers: {
            'Content-Type': 'application/json',
        },
    });

export const apiConfig = {
    dogs: "dogs",
    addDog: "add-dog",
    editDog: "edit-dog",
    deleteDog: "delete-dog",
    updates:"updates",
    addUpdate: "add-update",
    updatesByDogIdEndPoint: "updates-by-dogId",
    trainingGroups: "training-groups",
    addTrainingGroup: "add-training-group",
    addGroupTrainingUpdate: "add-group-training-update",
    families: "families",
    addFamily: "add-family",
    editFamily: "edit-family",
};