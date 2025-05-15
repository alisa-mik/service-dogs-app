import dayjs from "dayjs";
import "dayjs/locale/he"; // Import Hebrew locale
import styled from "styled-components";

dayjs.locale("he");

const DateTimeText = styled.div`
  font-size: 1.1rem;
  font-weight: 400;
  color: #333;
  width: 100%;
  text-align: left;
`;

export const CurrentDateTimeHebrew = () => {
  return (
    <DateTimeText>
      {dayjs().format("dddd, D בMMMM YYYY")}
    </DateTimeText>
  );
};