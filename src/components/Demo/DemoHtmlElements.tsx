import React from "react"
import { HtmlElement } from "DndXYHtmlEditor.types"
import { SystemUpdateAlt, ArtTrack, Storage, PhotoOutlined, TextFields, FormatShapes, InsertLink } from "@mui/icons-material"
import { PictureAndTextSbSElement, generalPictureAndTextSbSElementOptions } from "./PictureAndTextSbSElement";
import { PictureAndTextUeOElement, generalPictureAndTextUeOElementOptions } from "./PictureAndTextUeOElement";
import { ImageElement, generalImageElementOptions } from "./ImageElement";
import { TextElement, generalTextElementOptions } from "./TextElement";
import { HeadlineElement, generalHeadlineElementOptions } from "./HeadlineElement";
import { ButtonElement, generalButtonElementOptions } from "./ButtonElement";
import { styles } from "./DemoHtmlElements.styles";

const keyLabels = {
  title: 'Title',
  headingLevel: 'Headline size',
  fontSize: 'Font size',
  fontFamily: 'Font family',
  fontStyle: 'Font style',
  fontWeight: 'Font weight',
  textAlign: 'Text align',
  textMargin: 'Text margin',
  margin: 'Margin',
  color: 'Color',
  src: 'Source',
  alt: 'Alternative text',
  width: 'Width',
  height: 'Height',
  picturePosition: 'Picture position',
  pictureAlign: 'Picture align',
  content: 'Content',
  align: 'Align',
  label: 'Label',
  urlToOpen: 'Url to open',
  backgroundColor: 'Background color',
  borderRadius: 'Border radius'
}

const hideKeysFromConfiguration = ['src']

export const demoHtmlElements: HtmlElement[] = [
  {
    element: PictureAndTextSbSElement,
    toolbarPreview: <div style={styles.toolbarPreviewContainer}>
      <ArtTrack style={{ fontSize: '30px', color: '#0EA6CE' }} />
      <p style={styles.paragraph}>{'Picture and text'}</p>
      <p style={styles.paragraph}>{'(side by side)'}</p>
    </div>,
    protected: true,
    immovable: true,
    configuration: {
      elementIdentifier: 'PictureAndTextSbSElement',
      key: 'picture-and-text-side-by-side-element',
      keyLabels,
      // hideKeysFromConfiguration,
      customAction: (updateKeyValue: ({ key, value }: { key: string, value: string }) => void) => {
        return <div style={{ display: 'flex', alignItems: 'center' }} onClick={() => updateKeyValue({ key: 'src', value: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/36/37/32/caption.jpg?w=1100&h=1100&s=1' })}>
          <SystemUpdateAlt />
          <span>Update Image with some external image store</span>
        </div>
      },
      // src: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/36/37/32/caption.jpg?w=1100&h=1100&s=1',
      placeholderText: 'Add picture',
      alt: 'Configured Image Element',
      width: 500,
      height: 300,
      content: 'The capital of land-locked Hungary, there’s a cosmopolitan edge to the country’s most populous city which belies its turbulent political history (the city was partly destroyed during the final year of the Second World War and some 40 per cent of the city’s Jewish population was murdered during the same period), and there’s a rich architectural landscape which conceals a vibrant, contemporary creative centre – full to bursting with homegrown fashion brands and cutting edge eateries – within.',
      ...generalPictureAndTextSbSElementOptions
    },
  },
  {
    element: PictureAndTextUeOElement,
    toolbarPreview: <div style={styles.toolbarPreviewContainer}>
      <Storage style={{ fontSize: '20px', color: '#0EA6CE' }} />
      <p style={styles.paragraph}>{'Picture and text'}</p>
      <p style={styles.paragraph}>{'(under each other)'}</p>
    </div>,
    configuration: {
      elementIdentifier: 'PictureAndTextUeOElement',
      key: 'picture-and-text-under-each-other-element',
      keyLabels,
      // hideKeysFromConfiguration,
      // src: 'https://media.gq-magazine.co.uk/photos/5daf29d843196300087c8a24/16:9/w_2560%2Cc_limit/20191022-Budapest-01.jpg',
      placeholderText: 'Add picture',
      alt: 'Configured Image Element',
      width: 500,
      height: 300,
      content: `Buda Castle, perched atop a hill in Buda, is one of Hungary’s most iconic historical landmarks. This majestic complex includes palaces, museums, and libraries, offering stunning views of the Danube River and Pest. Inside the castle, you'll find the Hungarian National Gallery and the <a href="https://budapest.hu/" target="_blank">Budapest</a> History Museum, where you can explore the country's rich cultural and historical heritage`,
      ...generalPictureAndTextUeOElementOptions
    },
  },
  {
    element: ImageElement,
    toolbarPreview: <div style={styles.toolbarPreviewContainer}>
      <PhotoOutlined style={{ fontSize: '20px', color: '#0EA6CE' }} />
      <p>{'Picture'}</p>
    </div>,
    configuration: {
      elementIdentifier: 'ImageElement',
      key: 'image-element',
      keyLabels,
      // src: 'https://lp-cms-production.imgix.net/2023-03/GettyRF_473481530.jpg',
      placeholderText: 'Add picture',
      alt: 'Configured Image Element',
      ...generalImageElementOptions
    },
  },
  {
    element: HeadlineElement,
    toolbarPreview: <div style={styles.toolbarPreviewContainer}>
      <TextFields style={{ fontSize: '24px', color: '#0EA6CE' }} />
      <p>{'Headline'}</p>
    </div>,
    configuration: {
      elementIdentifier: 'HeadlineElement',
      key: 'headline-element',
      keyLabels,
      title: 'The ultimate 24-hour travel guide to Budapest',
      ...generalHeadlineElementOptions,
    },
  },
  {
    element: TextElement,
    toolbarPreview: <div style={styles.toolbarPreviewContainer}>
      <FormatShapes style={{ fontSize: '20px', color: '#0EA6CE' }} />
      <p>{'Textbox'}</p>
    </div>,
    configuration: {
      elementIdentifier: 'TextElement',
      key: 'text-element',
      keyLabels,
      content: `The home of stealth luxury situated in the cultural centre of beautiful Budapest, this low-key outcrop of the Four Seasons group is housed within the Gresham Palace, an exquisitely restored art nouveau building which was originally completed in 1906. Positioned directly across from the Széchenyi Chain Bridge (and with it the looming baroque façade of Buda Castle) the bedrooms on the river-facing side of the hotel boast fantastic views across the city.

Providing easy access to all of Budapest’s most important tourist spots (St Stephen’s Basilica is right behind the Gresham Palace and the aforementioned castle, the fairytale fisherman’s bastion and the soaring gothic spires of the parliament building are all situated within spitting distance), there’s also plenty to do inside the hotel, with an excellently appointed spa on the top floor and a cluster of excellent restaurants offering contemporary takes on traditional Hungarian cuisine. Stay elsewhere at your mini-break’s peril.'`,
      ...generalTextElementOptions
    },
  },
  {
    element: ButtonElement,
    toolbarPreview: <div style={styles.toolbarPreviewContainer}>
      <InsertLink style={{ fontSize: '24px', color: '#0EA6CE' }} />
      <p>{'Button'}</p>
    </div>,
    configuration: {
      elementIdentifier: 'ButtonElement',
      key: 'button-element',
      keyLabels,
      label: 'Ez itt egy gomb',
      urlToOpen: 'https://budapest.hu/',
      ...generalButtonElementOptions
    },
  },
];