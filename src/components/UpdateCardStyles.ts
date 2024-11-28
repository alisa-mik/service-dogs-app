// src/components/UpdateCardStyles.tsx
import styled from "styled-components";
import { BEAMING_SUN, BROWN_DARK, WHITE } from "../config/colors";

interface CategoryTagProps {
    color: string;
}

export const CardContainer = styled.div<{ selected?: boolean }>`
    direction: rtl;
    padding: 15px;
    border-radius: 8px;
    border: 1px solid #c2c2c2;
    background-color: #fff;
    cursor: pointer;
    transition: box-shadow 0.3s ease;
    display: flex;
    gap: 10px;
    position: relative;
    opacity: 0;
    background: ${({ selected }) => selected ? BEAMING_SUN : WHITE};

    &:hover {
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
    }
`;

export const HeaderRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`;

export const CategoriesContainer = styled.div`
    display: flex;
    gap: 5px;
    flex-wrap: wrap; 
`;

export const CategoryTag = styled.span<CategoryTagProps>`
    background-color: ${({ color }) => color};
    color: ${WHITE};
    padding: 3px 8px;
    border-radius: 12px;
    font-size: 12px;
`;

export const DogInfo = styled.div`
display: flex;
flex-direction: column;
flex: 0.1;
align-items: center;
justify-content: flex-start;
color: ${BROWN_DARK};
`

export const MainContent = styled.div`
display: flex;
flex-direction: column;
flex: 1;
`