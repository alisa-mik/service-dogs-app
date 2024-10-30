

export const DEFAULT_CATEGORY_COLOR = "#A9A9A9";

export const CATEGORY_COLORS: Record<string, string> = {
    health: "#797d62ff",
    groupTraining: "#9b9b7aff",
    nutrition: "#d9ae94ff",
    behavior: "#f69c6d",
    homeVisit: "#f4a261ff",
    training: "#d08c60ff",
    familyUpdate: "#997b66ff"
}

export interface Category {
    name: string;
    color: string;
}

export const categoriesTranslation: Record<string, string> = {
    health: "רפואי",
    groupTraining: "אימון קבוצתי",
    nutrition: "תזונה",
    behavior: "התנהגותי",
    homeVisit: "ביקור בית",
    training: "אימון",
    familyUpdate: "עדכון משפחה",
}