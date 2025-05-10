import styled from "styled-components"
import { WidgetTitle } from "../components/commonParts/Labels"
import { LabelValue } from "../components/commonParts/LabelValue"
import { Column, Row, WidgetBody, WidgetHeader } from "../components/commonParts/Layouts"
import { useSelector } from "react-redux"
import { selectDogProfile } from "../store/dogProfileSlice"
import { DogMedicalInfoForm } from "../components/Forms/DogMedicalInfoForm"
import { Dog } from "../types/dogTypes"

const SWidgetBody = styled(WidgetBody)`
  justify-content: start;
  gap: 30px;
`

const StyledRow = styled(Row)`
  align-items: flex-start;
`

export const DogMedicalInfo = () => {
  const dog = useSelector(selectDogProfile);

  const { dogId } = dog as Dog;

  const data = {
    dogId: dogId,
    scheduled: "",
    reason: "",
    bp: "",
    "vaccine-1": "",
    "vaccine-2": "",
    "vaccine-3": "",
    "rabies-1": "",
    "rabies-2": "",
    worms: "",
    bravecto: "",
    chip: "",
    spay: ""
  }


  return (
    <>
      <WidgetHeader>
        <WidgetTitle>מידע רפואי</WidgetTitle>
        <DogMedicalInfoForm data={data} icon={"edit"} />
      </WidgetHeader>
      <SWidgetBody>
        <Row>
          <LabelValue label="מועד שנקבע:" value={'5/5/2021'} />
          <LabelValue label="עבור:" value={'חיסון משושה'} />
        </Row>
        <StyledRow>
          <Column gap={'5px'}>
            <LabelValue label="חיסון BP:" value={'5/5/2021'} />
            <LabelValue label="חיסון משושה 1:" value={'5/5/2021'} />
            <LabelValue label="חיסון משושה 2:" value={'5/5/2021'} />
            <LabelValue label="חיסון משושה 3:" value={''} />
            <LabelValue label="חיסון כלבת 1:" value={'5/5/2021'} />
            <LabelValue label="חיסון כלבת 2:" value={''} />
          </Column>
          <Column gap={'5px'}>
            <LabelValue label="שבב:" value={'5/5/2021'} />
            <LabelValue label="עיקור/ סירוס:" value={'5/5/2021'} />
          </Column>
        </StyledRow>
      </SWidgetBody>
    </>
  )
}
