import React from "react"
import { htmlElementConfiguration } from "DndXYHtmlEditor.types"

export const generalImageElementOptions = {
  align: {
    value: 'center',
    type: 'dropdown',
    options: ['left', 'center', 'right']
  },
}

export const ImageElement = (props: htmlElementConfiguration) => {
  return <div style={{ width: '100%', textAlign: props?.align?.value }}>
    <img
      src={props?.src}
      alt={props?.alt}
      width={props?.width}
      height={props?.height}
    />
  </div>
}