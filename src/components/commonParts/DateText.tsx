import styled from "styled-components";
import dayjs from "dayjs";
import "dayjs/locale/he"; // Import Hebrew locale
import localizedFormat from "dayjs/plugin/localizedFormat";
import { LIGHT_GREY } from "../../config/colors";

const DateText = styled.div<{ size: string, color: string }>`
  font-size: ${({ size }) => size};
  color:  ${({ color }) => color};
  display: flex;
  align-items: center;
  cursor: default;
`;

interface IdateText {
  date: number;
  size?: string;
  color?: string
}

export default ({ date, size = "12px", color = `${LIGHT_GREY}` }: IdateText) => {
  dayjs.extend(localizedFormat);
  dayjs.locale("he");

  const formattedDate = dayjs.unix(date).format("D [ב]MMMM YYYY");

  return <DateText size={size} color={color}>{formattedDate}</DateText>;
};
