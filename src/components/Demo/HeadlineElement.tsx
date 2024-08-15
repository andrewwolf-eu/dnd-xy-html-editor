import React from "react"
import { htmlElementConfiguration } from "DndXYHtmlEditor.types"

export const generalHeadlineElementOptions = {
  headingLevel: {
    value: '1',
    options: ['1', '2', '3', '4']
  },
  fontFamily: {
    value: 'Times New Roman',
    type: 'dropdown',
    options: ['Times New Roman', 'Georgia', 'Garamond', 'Palatino', 'Bookman', 'Arial', 'Helvetica', 'Verdana', 'Tahoma', 'Trebuchet MS', 'Gill Sans']
  },
  textAlign: {
    value: 'left',
    type: 'dropdown',
    options: ['left', 'center', 'right', 'justify']
  },
  color: {
    value: 'black',
    type: 'dropdown',
    options: ['black', 'red', 'green', 'blue', 'purple']
  },
  fontStyle: {
    value: 'normal',
    options: ['normal', 'italic']
  }
}

export const HeadlineElement = (props: htmlElementConfiguration) => {
  let headlineStyle = {
    fontFamily: props?.fontFamily?.value,
    textAlign: props?.textAlign?.value,
    color: props?.color?.value,
    fontStyle: props?.fontStyle?.value,
  };

  const HeadingTag = `h${props?.headingLevel?.value}` as keyof JSX.IntrinsicElements;
  return <div style={{ width: '100%' }}>
    <HeadingTag style={{ ...headlineStyle }}>{props.title}</HeadingTag>
  </div>;
}