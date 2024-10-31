import styled from "styled-components";
import dayjs from "dayjs";
import "dayjs/locale/he"; // Import Hebrew locale
import localizedFormat from "dayjs/plugin/localizedFormat";
import { LIGHT_GREY } from "../../config/colors";
import { formatDateFromSeconds } from "../../utils/converts";

const DateText = styled.div<{ size: string }>`
  font-size: ${({ size }) => size};
  color: ${LIGHT_GREY};
`;

interface IdateText {
  date: number;
  size?: string;
}

export default ({ date, size = "12px" }: IdateText) => {
  dayjs.extend(localizedFormat);
  dayjs.locale("he");

  console.log(formatDateFromSeconds(date));

  const formattedDate = dayjs.unix(date).format("D [ב]MMMM YYYY");

  return <DateText size={size}>{formattedDate}</DateText>;
};
