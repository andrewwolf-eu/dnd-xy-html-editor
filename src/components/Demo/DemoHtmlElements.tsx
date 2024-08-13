import React from "react"
import { htmlElementConfiguration, HtmlElement } from "DndXYHtmlEditor.types"
import { BusinessCenterOutlined } from "@mui/icons-material"
import { styles } from "./DemoHtmlElements.styles";

export const PictureAndTextSbSElement = (props: htmlElementConfiguration) => {
  let paragraphStyle = {
    textAlign: props?.textAlign?.value,
    fontSize: props?.fontSize?.value,
    color: props?.color?.value,
    fontWeight: props?.fontWeight?.value,
    margin: props?.textMargin?.value,
  };

  const Image = () => (<td align={props?.pictureAlign?.value} valign="top" width="50%"><img
    src={props?.src}
    alt={props?.alt}
    width={props?.width}
    height={props?.height}
  /></td>)

  const Text = () => (<td align={paragraphStyle?.textAlign?.value} valign="top" width="50%"><p style={paragraphStyle}>{props.content}</p></td>)

  return (
    <table style={{ width: "100%" }} cellPadding={0} cellSpacing={0} border={0}>
      <tr>
        {props?.picturePosition?.value === "left" ? (
          <>
            <Image />
            <Text />
          </>
        ) : (
          <>
            <Text />
            <Image />
          </>
        )}
      </tr>
    </table >
  );
};

export const PictureAndTextUeOElement = (props: htmlElementConfiguration) => {
  let paragraphStyle = {
    textAlign: props?.textAlign?.value,
    fontSize: props?.fontSize?.value,
    color: props?.color?.value,
    fontWeight: props?.fontWeight?.value,
    margin: props?.textMargin?.value,
  };

  const Image = () => (<tr><td align={props?.pictureAlign?.value} valign="top" width="50%"><img
    src={props?.src}
    alt={props?.alt}
    width={props?.width}
    height={props?.height}
  /></td></tr>)

  const Text = () => (<tr><td align={paragraphStyle?.textAlign?.value} valign="top" width="50%"><p style={paragraphStyle}>{props.content}</p></td></tr>)

  return (
    <table style={{ width: "100%" }} cellPadding={0} cellSpacing={0} border={0}>
      <tr>
        {props?.picturePosition?.value === "top" ? (
          <>
            <Image />
            <Text />
          </>
        ) : (
          <>
            <Text />
            <Image />
          </>
        )}
      </tr>
    </table >
  );
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

export const TextElement = (props: htmlElementConfiguration) => {
  let paragraphStyle = {
    textAlign: props?.textAlign?.value,
    fontSize: props?.fontSize?.value,
    color: props?.color?.value,
    fontWeight: props?.fontWeight?.value,
  };

  return <div style={{ width: '100%' }}>
    <p style={{ ...paragraphStyle }}>{props.content}</p>
  </div>
}

export const HeadlineElement = (props: htmlElementConfiguration) => {
  let headlineStyle = {
    textAlign: props?.textAlign?.value,
    color: props?.color?.value,
  };

  const HeadingTag = `h${props?.headingLevel?.value}` as keyof JSX.IntrinsicElements;
  return <div style={{ width: '100%' }}>
    <HeadingTag style={{ ...headlineStyle }}>{props.title}</HeadingTag>
  </div>;
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

export const demoHtmlElements: HtmlElement[] = [
  {
    element: PictureAndTextSbSElement,
    toolbarPreview: <div style={styles.toolbarPreviewContainer}>
      <BusinessCenterOutlined />
      <p style={styles.paragraph}>{'Picture and text'}</p>
      <p style={styles.paragraph}>{'(side by side)'}</p>
    </div>,
    configuration: {
      elementIdentifier: 'PictureAndTextSbSElement',
      key: 'picture-and-text-side-by-side-element',
      src: 'https://media.gq-magazine.co.uk/photos/5daf29d843196300087c8a24/16:9/w_2560%2Cc_limit/20191022-Budapest-01.jpg',
      picturePosition: {
        value: 'left',
        type: 'dropdown',
        options: ['left', 'right']
      },
      pictureAlign: {
        value: 'center',
        type: 'dropdown',
        options: ['left', 'center', 'right']
      },
      alt: 'Configured Image Element',
      width: '500',
      height: '300',
      content: 'The capital of land-locked Hungary, there’s a cosmopolitan edge to the country’s most populous city which belies its turbulent political history (the city was partly destroyed during the final year of the Second World War and some 40 per cent of the city’s Jewish population was murdered during the same period), and there’s a rich architectural landscape which conceals a vibrant, contemporary creative centre – full to bursting with homegrown fashion brands and cutting edge eateries – within.',
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
      textMargin: {
        value: '30px',
        options: ['10px', '20px', '30px']
      },
    },
  },
  {
    element: PictureAndTextUeOElement,
    toolbarPreview: <div style={styles.toolbarPreviewContainer}>
      <BusinessCenterOutlined />
      <p style={styles.paragraph}>{'Picture and text'}</p>
      <p style={styles.paragraph}>{'(under each other)'}</p>
    </div>,
    configuration: {
      elementIdentifier: 'PictureAndTextUeOElement',
      key: 'picture-and-text-under-each-other-element',
      src: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/36/37/32/caption.jpg?w=1100&h=1100&s=1',
      picturePosition: {
        value: 'top',
        type: 'dropdown',
        options: ['top', 'bottom']
      },
      pictureAlign: {
        value: 'center',
        type: 'dropdown',
        options: ['left', 'center', 'right']
      },
      alt: 'Configured Image Element',
      width: '500',
      height: '300',
      content: 'The capital of land-locked Hungary, there’s a cosmopolitan edge to the country’s most populous city which belies its turbulent political history (the city was partly destroyed during the final year of the Second World War and some 40 per cent of the city’s Jewish population was murdered during the same period), and there’s a rich architectural landscape which conceals a vibrant, contemporary creative centre – full to bursting with homegrown fashion brands and cutting edge eateries – within.',
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
      textMargin: {
        value: '30px',
        options: ['10px', '20px', '30px']
      },
    },
  },
  {
    element: ImageElement,
    toolbarPreview: <div style={styles.toolbarPreviewContainer}>
      <BusinessCenterOutlined />
      <p>{'Picture'}</p>
    </div>,
    configuration: {
      elementIdentifier: 'ImageElement',
      key: 'image-element',
      src: 'https://lp-cms-production.imgix.net/2023-03/GettyRF_473481530.jpg',
      alt: 'Configured Image Element',
      width: '500',
      height: '300',
      align: {
        value: 'center',
        type: 'dropdown',
        options: ['left', 'center', 'right']
      },
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
      title: 'The ultimate 24-hour travel guide to Budapest',
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
        value: 'black',
        type: 'dropdown',
        options: ['black', 'red', 'green', 'blue', 'purple']
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
      content: `The home of stealth luxury situated in the cultural centre of beautiful Budapest, this low-key outcrop of the Four Seasons group is housed within the Gresham Palace, an exquisitely restored art nouveau building which was originally completed in 1906. Positioned directly across from the Széchenyi Chain Bridge (and with it the looming baroque façade of Buda Castle) the bedrooms on the river-facing side of the hotel boast fantastic views across the city.

Providing easy access to all of Budapest’s most important tourist spots (St Stephen’s Basilica is right behind the Gresham Palace and the aforementioned castle, the fairytale fisherman’s bastion and the soaring gothic spires of the parliament building are all situated within spitting distance), there’s also plenty to do inside the hotel, with an excellently appointed spa on the top floor and a cluster of excellent restaurants offering contemporary takes on traditional Hungarian cuisine. Stay elsewhere at your mini-break’s peril.'`,
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
    },
  },
  {
    element: ButtonElement,
    toolbarPreview: <div style={styles.toolbarPreviewContainer}>
      <BusinessCenterOutlined />
      <p>{'Button'}</p>
    </div>,
    configuration: {
      elementIdentifier: 'ButtonElement',
      key: 'button-element',
      label: 'Ez itt egy gomb',
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
      urlToOpen: 'https://budapest.hu/'
    },
  },
];