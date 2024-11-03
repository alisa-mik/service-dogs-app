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
    editDog: "edit-dog",
    deleteDog: "delete-dog",
    updates:"updates",
    updatesByDogIdEndPoint: "updates-by-dogId",
    addUpdate: "add-update",
    trainingGroups: "training-groups",
    addTrainingGroup: "add-training-group",
    addGroupTrainingUpdate: "add-group-training-update"
};