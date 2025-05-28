import { FoodSummary, GearSummary } from "../types/familyUpdateTypes";
import { foodMap } from "./familyUpdatesUtils";
import { gearMap } from "./familyUpdatesUtils";

function groupRequestsByDog(requests: any[]) {
  const dogGroups: { [ dogName: string ]: any[] } = {};
  requests.forEach((req) => {
    if (!dogGroups[ req.dogName ]) {
      dogGroups[ req.dogName ] = [];
    }
    dogGroups[ req.dogName ].push(req);
  });
  return dogGroups;
}

export const formatRequestsSummary = (
  gearSummary: GearSummary | null,
  foodSummary: FoodSummary | null,
  selectedGroup: string
): string => {
  let message = "";
  message += (selectedGroup === "all" ? "כל הקבוצות" : `${selectedGroup} :קבוצה`) + "\n\n";

  if (gearSummary) {
    message += "*הזמנות ציוד*\n";
    message += "--------------------\n";
    // Collect all unresolved gear requests
    const allGearRequests: any[] = [];
    Object.entries(gearSummary).forEach(([ type, data ]) => {
      if (data.pendingCount > 0) {
        data.requests.forEach((req) => {
          if (!req.resolved) {
            allGearRequests.push({ ...req, type, itemName: gearMap[ type ] });
          }
        });
      }
    });
    // Group by dog
    const dogGroups = groupRequestsByDog(allGearRequests);
    Object.entries(dogGroups).forEach(([ dogName, requests ]) => {
      message += `*${dogName}*\n`;
      requests.forEach((req) => {
        message += `- ${req.itemName}\n`;
      });
      message += "\n";
    });
  }

  if (foodSummary) {
    message += "*הזמנות אוכל*\n";
    message += "--------------------\n";
    // Collect all unresolved food requests
    const allFoodRequests: any[] = [];
    Object.entries(foodSummary).forEach(([ type, data ]) => {
      if (data.pendingCount > 0) {
        data.requests.forEach((req) => {
          if (!req.resolved) {
            allFoodRequests.push({ ...req, type, itemName: foodMap[ type ] });
          }
        });
      }
    });
    // Group by dog
    const dogGroups = groupRequestsByDog(allFoodRequests);
    Object.entries(dogGroups).forEach(([ dogName, requests ]) => {
      message += `*${dogName}*\n`;
      requests.forEach((req) => {
        message += `- ${req.itemName}\n`;
      });
      message += "\n";
    });
  }

  return message;
};

export const formatPhoneNumber = (phoneNumber: string): string => {
  // Remove any non-digit characters
  const cleanNumber = phoneNumber.replace(/[^0-9]/g, "");

  // If the number starts with '0', remove it and add '972'
  if (cleanNumber.startsWith("0")) {
    return "972" + cleanNumber.slice(1);
  }

  return cleanNumber;
};

export const shareViaWhatsApp = (message: string) => {
  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/?text=${encodedMessage}`, "_blank");
}; 