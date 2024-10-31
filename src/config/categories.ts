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