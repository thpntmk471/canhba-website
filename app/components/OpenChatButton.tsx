"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

type OpenChatButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
};

export default function OpenChatButton({
    children,
    className = "",
    type = "button",
    onClick,
    ...props
}: OpenChatButtonProps) {
    return (
        <button
            type={type}
            className={className}
            onClick={(event) => {
                onClick?.(event);

                window.dispatchEvent(new Event("open-canhba-chat"));
            }}
            {...props}
        >
            {children}
        </button>
    );
}