"use client";

type Props = {
    text?: string;
    link?: string;
    onClick?: () => void;
    className?: string;
    type?: "button" | "submit" | "reset";
    children?: React.ReactNode;
}

export default function Btn({text, children, link, onClick, className, type}: Props) {
    
    if (link) {
        return (
            <a href={link} className={`btn ${className}`}>
            {children || text}
            </a>
        );
    }
    
    return (
        <button className={`btn ${className}`} type={type} onClick={onClick}>
            {children || text}
        </button>
    );
}