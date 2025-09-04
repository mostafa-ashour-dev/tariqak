import {
    PressableProps,
    TextInputProps,
    TextProps,
    TouchableOpacityProps,
    ViewProps,
} from "react-native";
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
    lineHeight?: string;
    textAlgin?: string;
    color?: string;
};
export const Caption = styled.Text<CaptionProps>`
    font-family: ${theme.fontFamilies.secondary.medium};
    color: ${({ color }: CaptionProps) =>
        color || lightTheme.colors.text.light};
    font-size: ${({ fontSize }: CaptionProps) =>
        fontSize || theme.fontSizes["md"]};
    text-align: ${({ textAlgin }: CaptionProps) => textAlgin || "right"};
    line-height: ${({ lineHeight }: CaptionProps) => lineHeight || "16px"};
`;

type MainButtonProps = TouchableOpacityProps & {
    outlined?: boolean;
    width: string;
};
export const MainButton = styled.TouchableOpacity<MainButtonProps>`
    width: ${({ width }: MainButtonProps) => width || "85%"};
    background-color: ${({ outlined }: MainButtonProps) =>
        outlined ? "white" : lightTheme.colors.primary};
    display: flex;
    justify-content: center;
    align-items: center;
    padding: ${({ outlined }: MainButtonProps) =>
        outlined ? `${theme.padding.md}` : `${theme.padding.md + 2}`}px;
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
    font-family: ${theme.fontFamilies.main.bold};
`;

type InputProps = TextInputProps & {
    fontSize?: string;
    textAlgin?: string;
    flex?: number;
    width?: string;
    padding?: string;
};
export const MainInput = styled.TextInput<InputProps>`
    flex: ${({ flex }: InputProps) => flex || 1};
    background-color: white;
    border-radius: ${theme.radius.sm}px;
    padding: ${({ padding }: InputProps) => padding || "10px"};
    height: auto;
    border: 1px solid ${lightTheme.colors.border.gray};
    width: ${({ width }: InputProps) => width || "100%"};
    font-size: ${({ fontSize }: InputProps) =>
        fontSize || theme.fontSizes["md"]};
    color: ${lightTheme.colors.text.dark};
    font-family: ${theme.fontFamilies.secondary.regular};
    text-align: ${({ textAlgin }: InputProps) => textAlgin || "right"};
`;

type IconContainerProps = ViewProps & {};
export const IconContainer = styled.View<IconContainerProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 7px;
    background-color: white;
    border-radius: ${theme.radius.sm}px;
    border: 1px solid ${lightTheme.colors.border.gray};
`;

type IconButtonProps = PressableProps & {};
export const IconButton = styled.Pressable<IconButtonProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 7px;
    background-color: white;
    border-radius: ${theme.radius.sm}px;
    border: 1px solid ${lightTheme.colors.border.gray};
`;

type MainLinkTextProps = TextProps & {
    fontSize?: string;
};
export const MainLinkText = styled.Text<MainLinkTextProps>`
    color: ${lightTheme.colors.link};
    font-size: ${({ fontSize }: MainLinkTextProps) =>
        fontSize || theme.fontSizes["md"]};
    font-family: ${theme.fontFamilies.secondary.regular};
`;

type SecondaryTextProps = TextProps & {
    fontSize?: string;
};
export const SecondaryText = styled.Text<SecondaryTextProps>`
    font-size: ${({ fontSize }: SecondaryTextProps) =>
        fontSize || theme.fontSizes["md"]};
    font-family: ${theme.fontFamilies.secondary.regular};
`;
