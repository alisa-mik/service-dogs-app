import { Dog } from "./dogTypes";

export interface Project {
    projectId: string;
    projectName: string;
    description: string;
    dogIds: string[];
    startDate: number;
    endDate: number;
}

export interface Project {
    projectId: string;
    projectName: string;
    description: string;
    dogIds: string[];
    startDate: number;
    endDate: number;
    dogs?: Dog[]; 
  }