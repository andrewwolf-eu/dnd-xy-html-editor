import React from "react";
import { PhotoOutlined } from '@mui/icons-material';
import { htmlElementConfiguration } from "DndXYHtmlEditor.types";
import { generalTextElementOptions } from "./TextElement";

export const generalPictureAndTextSbSElementOptions = {
  picturePosition: {
    value: 'left',
    type: 'dropdown',
    options: [
      { label: 'Left', value: 'left' },
      { label: 'Right', value: 'right' },
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

export const PictureAndTextSbSElement = (props: htmlElementConfiguration) => {
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
    <td align={props?.pictureAlign?.value} valign="top" width="50%">
      {props?.src ? <img
        crossOrigin="anonymous"
        src={props?.src}
        alt={props?.alt}
        width={props?.width}
        height={props?.height}
      /> : <div style={
        {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '212px',
          height: '212px',
          backgroundColor: '#EEEEEE',
          alignContent: 'center'
        }}>
        <PhotoOutlined style={{ fontSize: '24px', color: '#777777' }} />
        <p style={{ fontSize: '16px', color: '#222222' }}></p>{props?.placeholderText}
      </div>
      }
    </td>
  );

  const Text = () => (
    <td align={paragraphStyle?.textAlign} valign="top" width="50%">
      <p style={paragraphStyle} dangerouslySetInnerHTML={{ __html: props.content }} />
    </td>
  );

  return (
    <table style={{ width: "100%" }} cellPadding={0} cellSpacing={0} border={0}>
      <tbody>
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
      </tbody>
    </table>
  );
};