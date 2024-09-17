import React from "react"
import { htmlElementConfiguration } from "DndXYHtmlEditor.types"

export const generalTextElementOptions = {
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
      { label: 'Courier New', value: 'Courier New' },
      { label: 'Lucida Console', value: 'Lucida Console' },
      { label: 'Monaco', value: 'Monaco' },
      { label: 'Consolas', value: 'Consolas' },
      { label: 'Andale Mono', value: 'Andale Mono' },
      { label: 'Comic Sans MS', value: 'Comic Sans MS' },
      { label: 'Brush Script MT', value: 'Brush Script MT' },
      { label: 'Lucida Handwriting', value: 'Lucida Handwriting' },
      { label: 'Monotype Corsiva', value: 'Monotype Corsiva' },
      { label: 'Impact', value: 'Impact' },
      { label: 'Papyrus', value: 'Papyrus' },
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
  fontSize: {
    value: '14px',
    type: 'dropdown',
    options: [
      { label: '10 pixel', value: '10px' },
      { label: '12 pixel', value: '12px' },
      { label: '14 pixel', value: '14px' },
      { label: '16 pixel', value: '16px' },
      { label: '18 pixel', value: '18px' },
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
  fontWeight: {
    value: 'normal',
    options: [
      { label: 'Normal', value: 'normal' },
      { label: 'Bold', value: 'bold' },
    ]
  },
  fontStyle: {
    value: 'normal',
    options: [
      { label: 'Normal', value: 'normal' },
      { label: 'Italic', value: 'italic' },
    ]
  },
  textMargin: {
    value: '30px',
    options: [
      { label: '10 pixel', value: '10px' },
      { label: '20 pixel', value: '20px' },
      { label: '30 pixel', value: '30px' },
    ]
  },
}

export const TextElement = (props: htmlElementConfiguration) => {
  let paragraphStyle = {
    fontFamily: props?.fontFamily?.value,
    textAlign: props?.textAlign?.value,
    fontSize: props?.fontSize?.value,
    color: props?.color?.value,
    fontWeight: props?.fontWeight?.value,
    fontStyle: props?.fontStyle?.value,
    margin: props?.textMargin?.value,
  };

  return <div style={{ width: '100%' }}>
    <p style={{ ...paragraphStyle }}>{props.content}</p>
  </div>
}