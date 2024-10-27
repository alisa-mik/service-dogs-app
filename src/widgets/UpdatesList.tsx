import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectAllUpdates } from "../store/updatesSlice";
import UpdateCard from "../components/UpdateCard";
import { Center } from "../components/commonParts/Center";

const UpdatesContainer = styled.div`
  flex: 1;
  padding: 0 10px 10px 10px;
  display: flex;
  flex-direction: column;
  text-align: right;
  gap: 10px;
  width: 100%;
  overflow: auto;
`;

export const UpdatesList = () => {
  const allUpdates = useSelector(selectAllUpdates);
  console.log({ allUpdates });

  const renderUpdates = () => {
    if (allUpdates.updates?.length === 0)
      return <Center>לא נמצאו עידכונים</Center>;
    return allUpdates.updates?.map((update) => (
      <UpdateCard key={update.updateId} update={update} showDogInfo={true} />
    ));
  };

  return <UpdatesContainer>{renderUpdates()}</UpdatesContainer>;
};
