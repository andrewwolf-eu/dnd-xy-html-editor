import React from "react"
import { htmlElementConfiguration } from "DndXYHtmlEditor.types"
import { generalTextElementOptions } from "./TextElement"

export const generalPictureAndTextSbSElementOptions = {
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

  const Image = () => (<td align={props?.pictureAlign?.value} valign="top" width="50%"><img
    src={props?.src}
    alt={props?.alt}
    width={props?.width}
    height={props?.height}
  /></td>)

  const Text = () => (<td align={paragraphStyle?.textAlign?.value} valign="top" width="50%"><p style={paragraphStyle}>{props.content}</p></td>)

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
    </table >
  );
};