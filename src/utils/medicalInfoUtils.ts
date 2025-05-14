export const getMedicalInfoTemplate = (gender: string) => {
  return [
    {
      type: "vaccine",
      label: "משושה",
      dates: [ -1, -1, -1 ],
      gap: 40,
      initialGap: 42,
    },
    {
      type: "rabies",
      label: "כלבת",
      dates: [ -1, -1 ],
      gap: 30,
      initialGap: 15,
    },
    {
      type: "worms",
      label: "תילוע",
      dates: [ -1, -1, -1, -1, -1 ],
      gap: 180,
      initialGap: 20,
    },
    {
      type: "bravecto",
      label: "פרעושים וקרציות",
      dates: [ -1, -1, -1, -1, -1 ],
      gap: 180,
      initialGap: 60,
    },
    {
      type: "spay",
      label: gender === "נקבה" ? "עיקור" : "סירוס",
      dates: [ -1 ],
      initialGap: 240,
    },
    { type: "bp", label: "BP", dates: [ -1 ], initialGap: 300 },
  ];
};

