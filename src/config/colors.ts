export const WHITE = "#ffffff";
export const LIGHT_GREY = "#858585";

export const PAINTED_PONY = "#B99470";
export const TOASTED_PINE_NUT = "#dac7a5";

export const BEAMING_SUN = "#FEFAE0";
export const SERPENTINE_GREEN = "#A6B37D";
export const MISTY_VALLEY = "#C0C78C";

// from service dogs website
export const YELLOW = "#f7ce5b";
export const YELLOW_DARKER = "#e2b332";
export const BEIGE_LIGHT = "#FFF5DA";
export const BROWN_DARK = "#1f1300";

export const DEFAULT_CATEGORY_COLOR = "#A9A9A9";

// Medical status colors
export const MEDICAL_STATUS = {
  UPCOMING: "#b3b2b1",    // More than 7 days until due (empty)
  SOON: "#ffb300",       // Due within 7 days
  DUE: "#f47f1f",        // Due now or within -7 days
  OVERDUE: "#c72929",    // Overdue more than 7 days
  COMPLETED: "#729c42",  // Treatment completed and not due yet
} as const;

export const CATEGORY_COLORS: Record<string, string> = {
  health: "#797d62ff",
  groupTraining: "#9b9b7aff",
  nutrition: "#d9ae94ff",
  behavior: "#f69c6d",
  homeVisit: "#f4a261ff",
  training: "#d08c60ff",
  familyUpdate: "#997b66ff",
};
