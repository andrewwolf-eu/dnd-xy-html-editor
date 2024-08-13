import React from "react"
import { htmlElementConfiguration, HtmlElement } from "DndXYHtmlEditor.types"
import { BusinessCenterOutlined } from "@mui/icons-material"
import { styles } from "./DemoHtmlElements.styles";

export const DivElement = (props: htmlElementConfiguration) => {
  return <div>
    <h2 style={props.titleStyle}>{props.title}</h2>
    <p style={props.descriptionStyle}>{props.description}</p>
    <p style={{ color: props?.isActive ? 'green' : 'red' }}>This is a paragraph.</p>
  </div>
}

export const ImageElement = (props: htmlElementConfiguration) => {
  return <img
    src={props.src}
    alt={props.alt}
  />
}

export const TextElement = (props: htmlElementConfiguration) => {
  let paragraphStyle = {
    textAlign: props?.textAlign?.value,
    fontSize: props?.fontSize?.value,
    color: props?.color.value,
    fontWeight: props?.fontWeight?.value,
  };

  return <div style={{ width: '100%' }}>
    <p style={{ ...paragraphStyle }}>{props.content}</p>
  </div>
}

export const HeadlineElement = (props: htmlElementConfiguration) => {
  let headlineStyle = {
    textAlign: props?.textAlign?.value,
    color: props?.color.value,
  };

  const HeadingTag = `h${props?.headingLevel?.value}` as keyof JSX.IntrinsicElements;
  return <div style={{ width: '100%' }}>
    <HeadingTag style={{ ...headlineStyle }}>{props.title}</HeadingTag>
  </div>;
}

export const demoHtmlElements: HtmlElement[] = [
  {
    element: DivElement,
    toolbarPreview: <div style={styles.toolbarPreviewContainer}>
      <BusinessCenterOutlined />
      <p style={styles.paragraph}>{'Picture and text'}</p>
      <p style={styles.paragraph}>{'(side by side)'}</p>
    </div>,
    configuration: {
      elementIdentifier: 'DivElement',
      key: 'div-element',
      title: 'Div Element Title1',
      description: 'Div Element Description1',
      titleStyle: { fontWeight: 'bold', color: 'blue' },
      descriptionStyle: { fontStyle: 'italic' },
      isActive: true,
    },
  },
  {
    element: ImageElement,
    toolbarPreview: <div style={styles.toolbarPreviewContainer}>
      <BusinessCenterOutlined />
      <p style={styles.paragraph}>{'Picture and text'}</p>
      <p style={styles.paragraph}>{'(under each other)'}</p>
    </div>,
    configuration: {
      elementIdentifier: 'ImageElement',
      key: 'image-element',
      src: 'https://via.placeholder.com/50',
      alt: 'Configured Image Element',
    },
  },
  {
    element: ImageElement,
    toolbarPreview: <div style={styles.toolbarPreviewContainer}>
      <BusinessCenterOutlined />
      <p>{'Picture'}</p>
    </div>,
    configuration: {
      elementIdentifier: 'TextElement',
      key: 'text-element',
    },
  },
  {
    element: HeadlineElement,
    toolbarPreview: <div style={styles.toolbarPreviewContainer}>
      <BusinessCenterOutlined />
      <p>{'Headline'}</p>
    </div>,
    configuration: {
      elementIdentifier: 'HeadlineElement',
      key: 'headline-element',
      title: 'Headline',
      headingLevel: {
        value: '1',
        options: ['1', '2', '3', '4']
      },
      textAlign: {
        value: 'left',
        type: 'dropdown',
        options: ['left', 'center', 'right', 'justify']
      },
      color: {
        value: 'red',
        type: 'dropdown',
        options: ['red', 'green', 'blue', 'purple']
      },
    },
  },
  {
    element: TextElement,
    toolbarPreview: <div style={styles.toolbarPreviewContainer}>
      <BusinessCenterOutlined />
      <p>{'Textbox'}</p>
    </div>,
    configuration: {
      elementIdentifier: 'TextElement',
      key: 'text-element',
      content: 'Text content',
      textAlign: {
        value: 'left',
        type: 'dropdown',
        options: ['left', 'center', 'right', 'justify']
      },
      fontSize: {
        value: '12px',
        options: ['12px', '14px', '16px']
      },
      color: {
        value: 'red',
        type: 'dropdown',
        options: ['red', 'green', 'blue', 'purple']
      },
      fontWeight: {
        value: 'normal',
        options: ['normal', 'bold']
      },
    },
  },
  {
    element: TextElement,
    toolbarPreview: <div style={styles.toolbarPreviewContainer}>
      <BusinessCenterOutlined />
      <p>{'Button'}</p>
    </div>,
    configuration: {
      elementIdentifier: 'TextElement',
      key: 'text-element',
    },
  },
];