import React from "react"
import { htmlElementConfiguration } from "DndXYHtmlEditor.types"

export const generalButtonElementOptions = {
  fontSize: {
    value: '14px',
    type: 'dropdown',
    options: ['10px', '12px', '14px', '16px', '18px']
  },
  align: {
    value: 'center',
    type: 'dropdown',
    options: ['left', 'center', 'right']
  },
  backgroundColor: {
    value: 'blue',
    type: 'dropdown',
    options: ['black', 'red', 'green', 'blue', 'purple']
  },
  color: {
    value: 'white',
    type: 'dropdown',
    options: ['black', 'red', 'green', 'blue', 'purple', 'white']
  },
  borderRadius: {
    value: '0px',
    type: 'dropdown',
    options: ['0px', '15px', '30px', '50px']
  },
}

export const ButtonElement = (props: htmlElementConfiguration) => {
  let buttonStyle = {
    backgroundColor: props?.backgroundColor?.value,
    color: props?.color?.value,
    fontSize: props?.fontSize?.value,
    borderRadius: props?.borderRadius?.value,
    padding: '10px 20px',
    display: 'inline-block',
    textDecoration: 'none',
  };

  return <div style={{ width: '100%', textAlign: props?.align?.value }}>
    <a href={props?.urlToOpen} style={{ ...buttonStyle }}>
      {props.label}
    </a>
  </div>;
}