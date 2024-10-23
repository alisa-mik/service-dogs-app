// src/components/UpdateCardStyles.tsx
import styled from "styled-components";

interface CategoryTagProps {
    color: string;
}

export const CardContainer = styled.div`
    direction: rtl; /* Ensure RTL layout */
    padding: 15px;
    border-radius: 8px;
    border: 1px solid #c2c2c2;
    /* box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); */
    background-color: #fff;
    cursor: pointer;
    transition: box-shadow 0.3s ease;
    display: flex;
    flex-direction: column;

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
    color: #fff;
    padding: 3px 8px;
    border-radius: 12px;
    font-size: 12px;
`;

export const DateText = styled.div`
    font-size: 12px;
    color: #858585;
`;

export const Content = styled.div<{ expanded: boolean }>`
    font-size: 14px;
    line-height: 1.5;
    overflow: hidden;
    height:  ${({ expanded }) => (expanded ? '100px' : "60px")};
    max-height: ${({ expanded }) => (expanded ? "500px" : "4.5em")}; 
    transition: all 0.5s ease;
`;

export const ToggleIndicator = styled.div`
    font-size: 12px;
    color: #007bff;
    text-align: right;
`;
