import axios from "axios";

export const apiClient = axios.create({
  baseURL: `https://q4anwwvawd.execute-api.eu-west-1.amazonaws.com/${import.meta.env.MODE
    }`,
  timeout: 5000, // Request timeout
  headers: {
    "Content-Type": "application/json",
    Env: import.meta.env.MODE,
  },
});

export const apiConfig = {
  dogs: "dogs",
  addDog: "add-dog",
  editDog: "edit-dog",
  deleteDog: "delete-dog",
  updates: "updates",
  addUpdate: "add-update",
  updatesByDogId: "updates-by-dogId",
  trainingGroups: "training-groups",
  addTrainingGroup: "add-training-group",
  deleteGroup: "delete-group",
  addGroupTrainingUpdate: "add-group-training-update",
  deleteUpdate: "delete-update",
  families: "families",
  addFamily: "add-family",
  editFamily: "edit-family",
  dogsByPhoneNumber: "dogs-by-phone-number",
  familyUpdates: "family-updates",
  editFamilyUpdatesStatus: "edit-family-updates-status",
  todos: "todos",
  medicalInfo: "medical-info",
};
