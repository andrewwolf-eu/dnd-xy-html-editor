import React from "react"
import { htmlElementConfiguration } from "DndXYHtmlEditor.types"

export const generalHeadlineElementOptions = {
  headingLevel: {
    value: '1',
    options: [
      { label: 'H1', value: '1' },
      { label: 'H2', value: '2' },
      { label: 'H3', value: '3' },
      { label: 'H4', value: '4' },
    ]
  },
  fontFamily: {
    value: 'Times New Roman',
    type: 'dropdown',
    options: [
      { label: 'Times New Roman', value: 'Times New Roman' },
      { label: 'Georgia', value: 'Georgia' },
      { label: 'Garamond', value: 'Garamond' },
      { label: 'Palatino', value: 'Palatino' },
      { label: 'Bookman', value: 'Bookman' },
      { label: 'Arial', value: 'Arial' },
      { label: 'Helvetica', value: 'Helvetica' },
      { label: 'Verdana', value: 'Verdana' },
      { label: 'Tahoma', value: 'Tahoma' },
      { label: 'Trebuchet MS', value: 'Trebuchet MS' },
      { label: 'Gill Sans', value: 'Gill Sans' },
    ]
  },
  textAlign: {
    value: 'left',
    type: 'dropdown',
    options: [
      { label: 'Left', value: 'left' },
      { label: 'Center', value: 'center' },
      { label: 'Right', value: 'right' },
      { label: 'Justify', value: 'justify' },
    ]
  },
  margin: {
    value: '30px',
    options: [
      { label: '10 pixel', value: '10px' },
      { label: '20 pixel', value: '20px' },
      { label: '30 pixel', value: '30px' },
    ]
  },
  color: {
    value: 'black',
    type: 'dropdown',
    options: [
      { label: 'Black', value: 'black' },
      { label: 'Red', value: 'red' },
      { label: 'Green', value: 'green' },
      { label: 'Blue', value: 'blue' },
      { label: 'Purple', value: 'purple' },
    ]
  },
  fontStyle: {
    value: 'normal',
    options: [
      { label: 'Normal', value: 'normal' },
      { label: 'Italic', value: 'italic' },
    ]
  }
}

export const HeadlineElement = (props: htmlElementConfiguration) => {
  let headlineStyle = {
    fontFamily: props?.fontFamily?.value,
    textAlign: props?.textAlign?.value,
    margin: props?.margin?.value,
    color: props?.color?.value,
    fontStyle: props?.fontStyle?.value,
  };

  const HeadingTag = `h${props?.headingLevel?.value}` as keyof JSX.IntrinsicElements;
  return <div style={{ width: '100%' }}>
    <HeadingTag style={{ ...headlineStyle }}>{props.title}</HeadingTag>
  </div>;
}