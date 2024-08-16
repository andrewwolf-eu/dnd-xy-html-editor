import React from "react"
import { htmlElementConfiguration } from "DndXYHtmlEditor.types"

export const generalTextElementOptions = {
  fontFamily: {
    value: 'Times New Roman',
    type: 'dropdown',
    options: [
      'Times New Roman',
      'Georgia',
      'Garamond',
      'Palatino',
      'Bookman',
      'Arial',
      'Helvetica',
      'Verdana',
      'Tahoma',
      'Trebuchet MS',
      'Gill Sans',
      'Courier New',
      'Lucida Console',
      'Monaco',
      'Consolas',
      'Andale Mono',
      'Comic Sans MS',
      'Brush Script MT',
      'Lucida Handwriting',
      'Monotype Corsiva',
      'Impact',
      'Papyrus'
    ]
  },
  textAlign: {
    value: 'left',
    type: 'dropdown',
    options: ['left', 'center', 'right', 'justify']
  },
  fontSize: {
    value: '14px',
    type: 'dropdown',
    options: ['10px', '12px', '14px', '16px', '18px']
  },
  color: {
    value: 'black',
    type: 'dropdown',
    options: ['black', 'red', 'green', 'blue', 'purple']
  },
  fontWeight: {
    value: 'normal',
    options: ['normal', 'bold']
  },
  fontStyle: {
    value: 'normal',
    options: ['normal', 'italic']
  },
  textMargin: {
    value: '30px',
    options: ['10px', '20px', '30px']
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