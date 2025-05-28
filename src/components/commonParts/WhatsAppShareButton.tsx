import styled from "styled-components";

const ShareButton = styled.div`


  &:hover {
   cursor: pointer;
  }

  img {
    width: 30px;
    height: 30px;
  }
`;

interface WhatsAppShareButtonProps {
  onClick: () => void;
}

export const WhatsAppShareButton = ({ onClick }: WhatsAppShareButtonProps) => {
  return (
    <ShareButton onClick={onClick}>
      <img src="/whatsapp.png" alt="WhatsApp" />
    </ShareButton>
  );
}; 