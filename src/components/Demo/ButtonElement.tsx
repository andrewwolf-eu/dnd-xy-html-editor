import React from "react"
import { htmlElementConfiguration } from "DndXYHtmlEditor.types"

export const generalButtonElementOptions = {
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
  align: {
    value: 'center',
    type: 'dropdown',
    options: [
      { label: 'Left', value: 'left' },
      { label: 'Center', value: 'center' },
      { label: 'Right', value: 'right' },
    ]
  },
  backgroundColor: {
    value: 'blue',
    type: 'dropdown',
    options: [
      { label: 'Black', value: 'black' },
      { label: 'Red', value: 'red' },
      { label: 'Green', value: 'green' },
      { label: 'Blue', value: 'blue' },
      { label: 'Purple', value: 'purple' },
    ]
  },
  color: {
    value: 'white',
    type: 'dropdown',
    options: [
      { label: 'Black', value: 'black' },
      { label: 'Red', value: 'red' },
      { label: 'Green', value: 'green' },
      { label: 'Blue', value: 'blue' },
      { label: 'Purple', value: 'purple' },
      { label: 'White', value: 'white' },
    ]
  },
  borderRadius: {
    value: '0px',
    type: 'dropdown',
    options: [
      { label: '0 pixel', value: '0px' },
      { label: '15 pixel', value: '15px' },
      { label: '30 pixel', value: '30px' },
      { label: '50 pixel', value: '50px' },
    ]
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

  return <div style={{ width: '660px', margin: '10px auto 10px auto', textAlign: props?.align?.value }}>
    <a href={props?.urlToOpen} style={{ ...buttonStyle }}>
      {props.label}
    </a>
  </div>;
}