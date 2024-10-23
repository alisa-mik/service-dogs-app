

export const DEFAULT_CATEGORY_COLOR = "#A9A9A9";

export const CATEGORY_COLORS: Record<string, string> = {
    health: "#10375C",
    groupTraining: "#EF9C66",
    nutrition: "#FFD700",
    behavior: "#9CA986",
    homeVisit: "#78ABA8",
    training: "#606676",
    familyUpdate: "#A2D2DF",
};

export interface Category {
    name: string;
    color: string;
}

export interface Category {
    name: string;
    color: string;
}

export const availableCategories: Category[] = [
    { name: "Training", color: "#FF6347" },   // Tomato
    { name: "Health", color: "#4682B4" },     // SteelBlue
    { name: "Behavior", color: "#32CD32" },   // LimeGreen
];

export const categoriesTranslation: Record<string, string> = {
    health: "רפואי",
    groupTraining: "אימון קבוצתי",
    nutrition: "תזונה",
    behavior: "התנהגותי",
    homeVisit: "ביקור בית",
    training: "אימון",
    familyUpdate: "עדכון משפחה",
}