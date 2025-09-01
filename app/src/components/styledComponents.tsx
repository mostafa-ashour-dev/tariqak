import { TextProps, TouchableOpacityProps } from "react-native";
import styled from "styled-components/native";
import { lightTheme, theme } from "styles/styles";

export const MainText = styled.Text<TextProps>`
    font-family: ${theme.fontFamilies.main.regular};
`;

type MainTitleProps = TextProps & {
    fontSize?: string;
};
export const MainTitle = styled(MainText)<MainTitleProps>`
    font-family: ${theme.fontFamilies.main.extraBold};
    color: ${lightTheme.colors.text.dark};
    font-size: ${({ fontSize }: MainTitleProps) =>
        fontSize || theme.fontSizes["2xl"]};
`;

type CaptionProps = TextProps & {
    fontSize?: string;
};
export const Caption = styled.Text<CaptionProps>`
    font-family: ${theme.fontFamilies.secondary.medium};
    color: ${lightTheme.colors.text.light};
    font-size: ${({ fontSize }: CaptionProps) =>
        fontSize || theme.fontSizes["md"]};
    text-align: center;
    line-height: 26;
`;

type MainButtonProps = TouchableOpacityProps & {
    outlined?: boolean;
};
export const MainButton = styled.TouchableOpacity<MainButtonProps>`
    width: 80%;
    background-color: ${({ outlined }: MainButtonProps) =>
        outlined ? "white" : lightTheme.colors.primary};
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 7px;
    border-radius: ${theme.radius.full}px;
    border: ${({ outlined }: MainButtonProps) =>
        outlined ? `2px solid ${lightTheme.colors.primary}` : "none"};
`;

type MainButtonTextProps = TextProps & {
    outlined?: boolean;
};
export const MainButtonText = styled.Text<MainButtonTextProps>`
    color: ${({ outlined }: MainButtonTextProps) =>
        outlined ? lightTheme.colors.primary : "white"};
    font-size: ${theme.fontSizes["base"]};
    font-family: ${theme.fontFamilies.main.semibold};
`;
