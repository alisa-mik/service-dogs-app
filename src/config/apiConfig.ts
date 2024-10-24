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
    deleteDog: "delete-dog",
    updatesByDogIdEndPoint: "updates-by-dogId",
    addUpdate: "add-update",
    editDog: "edit-dog"
};