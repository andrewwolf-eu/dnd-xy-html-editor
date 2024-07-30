import React from "react"
import { htmlElementConfiguration, htmlElement } from "DndXYHtmlEditor.types"

export const DivElement = (props: htmlElementConfiguration) => {
  return <div>
    <h2 style={props.titleStyle}>{props.title}</h2>
    <p style={props.descriptionStyle}>{props.description}</p>
  </div>
}

export const ImageElement = (props: htmlElementConfiguration) => {
  return <img
    src={props.src}
    alt={props.alt}
  />
}

export const TextElement = (props: htmlElementConfiguration) => {
  return <p>
    <strong>Configured Text Element</strong> with <em>updated nested elements</em>.
  </p>
}

export const demoHtmlElements: htmlElement[] = [
  {
    element: DivElement,
    configuration: {
      elementIdentifier: 'DivElement',
      key: 'div-element',
      title: 'Div Element Title1',
      description: 'Div Element Description1',
      titleStyle: { fontWeight: 'bold', color: 'blue' },
      descriptionStyle: { fontStyle: 'italic' },
    },
  },
  {
    element: ImageElement,
    configuration: {
      elementIdentifier: 'ImageElement',
      key: 'image-element',
      src: 'https://via.placeholder.com/50',
      alt: 'Configured Image Element',
    },
  },
  {
    element: TextElement,
    configuration: {
      elementIdentifier: 'TextElement',
      key: 'text-element',
    },
  },
];