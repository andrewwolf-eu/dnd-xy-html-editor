import React from "react"
import { PhotoOutlined } from '@mui/icons-material';
import { htmlElementConfiguration } from "DndXYHtmlEditor.types"

export const generalImageElementOptions = {
  align: {
    value: 'center',
    type: 'dropdown',
    options: [
      { label: 'Left', value: 'left' },
      { label: 'Center', value: 'center' },
      { label: 'Right', value: 'right' },
    ]
  },
}

export const ImageElement = (props: htmlElementConfiguration) => {
  return <div style={{ width: '660px', margin: '10px auto 10px auto', textAlign: props?.align?.value }}>
    {props?.src ? <img
      crossOrigin="anonymous"
      src={props?.src}
      alt={props?.alt}
      width={props?.width ? props?.width : '100%'}
      height={props?.height ? props?.height : '100%'}
    /> : <div style={
      {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '212px',
        height: '212px',
        backgroundColor: '#EEEEEE',
        marginLeft: props?.align?.value === 'center' ? 'auto' : props?.align?.value === 'right' ? 'auto' : '0',
        marginRight: props?.align?.value === 'center' ? 'auto' : props?.align?.value === 'left' ? 'auto' : '0',
      }}>
      <PhotoOutlined style={{ fontSize: '24px', color: '#777777' }} />
      <p style={{ fontSize: '16px', color: '#222222' }}></p>{props?.placeholderText}
    </div>}
  </div>
}