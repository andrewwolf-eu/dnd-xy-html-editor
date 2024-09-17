import React from "react"
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

  const Image = () => (<tr><td align={props?.pictureAlign?.value} valign="top" width="50%"><img
    src={props?.src}
    alt={props?.alt}
    width={props?.width}
    height={props?.height}
  /></td></tr>)

  const Text = () => (<tr><td align={paragraphStyle?.textAlign?.value} valign="top" width="50%"><p style={paragraphStyle}>{props.content}</p></td></tr>)

  return (
    <table style={{ width: "100%" }} cellPadding={0} cellSpacing={0} border={0}>
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