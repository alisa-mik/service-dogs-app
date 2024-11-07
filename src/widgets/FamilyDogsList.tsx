import React from "react";
import { WidgetBody, WidgetHeader } from "../components/commonParts/Layouts";
import { WidgetTitle } from "../components/commonParts/Labels";

export default function FamilyDogsList() {
  return (
    <>
      <WidgetHeader>
        <WidgetTitle>כלבים משוייכים</WidgetTitle>
      </WidgetHeader>

      <WidgetBody></WidgetBody>
    </>
  );
}
