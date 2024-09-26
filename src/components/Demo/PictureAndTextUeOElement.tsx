import React from "react"
import { PhotoOutlined } from '@mui/icons-material';
import { htmlElementConfiguration } from "DndXYHtmlEditor.types"
import { generalTextElementOptions } from "./TextElement"

export const generalPictureAndTextUeOElementOptions = {
  picturePosition: {
    value: 'top',
    type: 'dropdown',
    options: [
      { label: 'Top', value: 'top' },
      { label: 'Bottom', value: 'bottom' },
    ]
  },
  pictureAlign: {
    value: 'center',
    type: 'dropdown',
    options: [
      { label: 'Left', value: 'left' },
      { label: 'Center', value: 'center' },
      { label: 'Right', value: 'right' },
    ]
  },
  ...generalTextElementOptions
}

export const PictureAndTextUeOElement = (props: htmlElementConfiguration) => {
  let paragraphStyle = {
    fontFamily: props?.fontFamily?.value,
    textAlign: props?.textAlign?.value,
    fontSize: props?.fontSize?.value,
    color: props?.color?.value,
    fontWeight: props?.fontWeight?.value,
    fontStyle: props?.fontStyle?.value,
    margin: props?.textMargin?.value,
  };

  const Image = () => (
    <tr>
      <td
        align={props?.pictureAlign?.value}
        valign="top"
        width="100%"
      >
        {props?.src ? (
          <img
            crossOrigin="anonymous"
            src={props?.src}
            alt={props?.alt}
            width={props?.width}
            height={props?.height}
          />
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '212px',
              height: '212px',
              backgroundColor: '#EEEEEE',
              alignContent: 'center',
            }}
          >
            <PhotoOutlined style={{ fontSize: '24px', color: '#777777' }} />
            <p style={{ fontSize: '16px', color: '#222222' }}></p>
            {props?.placeholderText}
          </div>
        )}
      </td>
    </tr>
  );




  const Text = () => (<tr>
    <td align={paragraphStyle?.textAlign?.value} valign="top" width="100%">
      <p style={paragraphStyle} dangerouslySetInnerHTML={{ __html: props.content }} />
    </td>
  </tr>)

  return (
    <table style={{ width: '660px', margin: '10px auto 10px auto' }} cellPadding={0} cellSpacing={0} border={0}>
      <tbody>
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
      </tbody>
    </table >
  );
}