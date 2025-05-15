import html2pdf from "html2pdf.js";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectDogProfile } from "../store/dogProfileSlice";
import { Dog, Update } from "../types/dogTypes";
import { selectUpdatesByDogId } from "../store/updatesByDogIdSlice";
import { isEmpty } from "lodash";
import { formatDateFromSeconds, getAgeFromSeconds } from "../utils/converts";
import { BROWN_DARK, YELLOW, YELLOW_DARKER } from "../config/colors";
import { Row, WidgetBody, WidgetHeader } from "./commonParts/Layouts";
import { WidgetTitle } from "./commonParts/Labels";

interface GeneratePDFContentProps {
  dog: Dog;
  updates?: Update[];
}
// Define a function to generate HTML content dynamically
const generatePDFContent = ({ dog, updates }: GeneratePDFContentProps) => {
  const {
    dogName,
    color,
    breed,
    gender,
    dogStatus,
    momDog,
    dadDog,
    chipNumber,
    summary,
    // dropDate,
    // dropReason,
    groupId,
    birthDate,
    // dogId,
  } = dog as Dog;

  const noSpacing = "margin: 0; padding: 0";

  return `
    <html>
      <body style="font-family: Arial, sans-serif; direction: rtl; margin: 0; padding: 30px;">
        <div style="padding: 30px; text-align: right; direction: rtl">
          <h2 style=${noSpacing}>פרופיל כלב</h2>
          <div style="display: grid; grid-template-columns: 1fr 1fr; direction: rtl; margin: 0; padding: 0;">
            <!-- Left column -->
            <div style="margin: 0; padding: 0;">
              <p><strong>שם הכלב:</strong> ${dogName || "לא זמין"}</p>
              <p><strong>גזע:</strong> ${breed || "לא זמין"}</p>
              <p><strong>צבע:</strong> ${color || "לא זמין"}</p>
              <p><strong>מין:</strong> ${gender || "לא זמין"}</p>
              <p><strong>שם האם:</strong> ${momDog || "לא זמין"}</p>
              <p><strong>שם האב:</strong> ${dadDog || "לא זמין"}</p>
              </div>
              <!-- Right column -->
              <div style="margin: 0; padding: 0;">
              <p><strong>גיל:</strong> ${getAgeFromSeconds(birthDate) || "לא זמין"
    }</p>
              <p><strong>מספר שבב:</strong> ${chipNumber || "לא זמין"}</p>
              <p><strong>קבוצה:</strong> ${groupId || "לא זמין"}</p>
              <p><strong>סטטוס:</strong> ${dogStatus || "לא זמין"}</p>
            </div>
          </div>
          <div style="margin-bottom: 20px;">
          <h3 style="direction: rtl; margin: 0; padding: 0;">התרשמות כללית:</h3>
<div style="direction: rtl; margin: 0; padding: 0;">${summary}</div>
</div>
          <h3 style="direction: rtl; margin: 0; padding: 0;">עדכונים:</h3>
          <div style="direction: rtl; margin: 0; padding: 0;">
            ${updates
      ? updates
        .map((update: any) => {
          return `
                        <div style="margin-bottom: 10px;">
                          <p style="margin: 0; padding: 0;">${update.content
            }</p>
                          <p style="margin: 0; padding: 0; font-size: 12px; color: grey;">${formatDateFromSeconds(
              update.date
            )}</p>
                        </div>
                      `;
        })
        .join("")
      : "<div>אין עדכונים זמינים</div>"
    }
          </div>
        </div>
      </body>
    </html>
  `;
};

const DogProfilePDF = () => {
  const dog = useSelector(selectDogProfile);
  const updates = useSelector(selectUpdatesByDogId) || [];

  if (isEmpty(dog)) {
    return <div>No dog profile available.</div>;
  }

  const handleGeneratePDF = () => {
    const content = generatePDFContent({ dog, updates });

    const options = {
      margin: 10, // Margin in mm
      filename: `${dog.dogName}.pdf`,
      html2canvas: {
        scale: 3, // Increase scale for better resolution (default is 1)
      },
      jsPDF: {
        unit: "mm", // Use mm for measurements
        format: "a4", // Set to A4 size
        orientation: "portrait", // Portrait or landscape
      },
    };

    // Create a temporary div to hold the content and use html2pdf on it
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;
    document.body.appendChild(tempDiv); // Append to the body (hidden)

    // Generate the PDF from the content and trigger the download
    html2pdf()
      .set(options)
      .from(tempDiv)
      .save()
      .then(() => {
        document.body.removeChild(tempDiv); // Remove the temporary div
      });
  };

  return (
    <>
      <WidgetHeader>
        <WidgetTitle>פעולות</WidgetTitle>
      </WidgetHeader>
      <WidgetBody>
        <Row>
          <Button onClick={handleGeneratePDF}>הפקת דו"ח</Button>
          {/* <DogsImage /> */}
        </Row>
      </WidgetBody>
    </>
  );
};

// Styled-components for the button
const Button = styled.button`
  background-color: ${YELLOW};
  color: ${BROWN_DARK};
  padding: 10px 20px;
  border: none;
  width: fit-content;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: ${YELLOW_DARKER};
  }
`;

export default DogProfilePDF;
