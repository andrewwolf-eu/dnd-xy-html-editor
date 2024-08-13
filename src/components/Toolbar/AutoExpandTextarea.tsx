import React, { useState, useRef, useEffect, ChangeEvent, TextareaHTMLAttributes } from 'react';

interface AutoExpandTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const AutoExpandTextarea: React.FC<AutoExpandTextareaProps> = (props) => {
    const [text, setText] = useState<string>(props.value?.toString() || "");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Update the text when props.value changes
    useEffect(() => {
        setText(props.value?.toString() || "");
    }, [props.value]);

    // Adjust the height whenever the text changes
    useEffect(() => {
        if (textareaRef.current) {
            autoExpand(textareaRef.current);
        }
    }, [text]);

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
        autoExpand(event.target);
        if (props.onChange) {
            props.onChange(event); // Call the original onChange if provided
        }
    };

    const autoExpand = (element: HTMLTextAreaElement) => {
        element.style.height = 'auto'; // Reset the height to auto to calculate the scroll height
        element.style.height = `${element.scrollHeight}px`; // Set the height to the scroll height
    };

    return (
        <textarea
            {...props}
            ref={textareaRef}
            value={text}
            onChange={handleChange}
            style={{
                width: '100%',
                minHeight: '50px',
                maxHeight: '300px',
                overflowY: 'hidden',
                padding: '10px',
                boxSizing: 'border-box',
                fontFamily: 'Arial, sans-serif',
                fontSize: '16px',
                ...props.style, // Allow additional style overrides
            }}
        />
    );
};

export default AutoExpandTextarea;