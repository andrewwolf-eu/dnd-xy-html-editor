import React, { useEffect, useState } from "react";
import {
  ConfigurationComponentProps,
  HtmlElement,
  VerticalElement,
} from "DndXYHtmlEditor.types";
import AutoExpandTextarea from "./AutoExpandTextarea";
import { styles } from "./Toolbar.styles";
import { useEditor } from "../../context/EditorContext";
import { parseIfJsonObject } from "../../utils/dimensionUtils";

export const ConfigurationComponent: React.FC<ConfigurationComponentProps> = ({ configuration }) => {
  const { setHtmlElements, setVerticalElements } = useEditor();

  // Initialize formState with the `value` from each key in configuration
  const getInitialState = () => {
    const initialState: { [key: string]: any } = {};

    for (const key in configuration) {
      if (configuration.hasOwnProperty(key)) {
        const value = configuration[key];
        if (typeof value === 'object' && value.hasOwnProperty('value') && value.hasOwnProperty('options')) {
          initialState[key] = value.value; // Use the `value` property for formState
        } else {
          initialState[key] = value; // Use the value directly if it's not an object with `value` and `options`
        }
      }
    }

    return initialState;
  };

  const [formState, setFormState] = useState(getInitialState);

  useEffect(() => {
    setFormState(getInitialState);
  }, [configuration]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | { name: string, value: string | number }
  ) => {
    let name: string;
    let value: any;

    if ('target' in e) {
      name = e.target.name;
      value = e.target.value;

      if (e.target instanceof HTMLInputElement && e.target.type === 'checkbox') {
        value = e.target.checked;
      } else {
        const result = parseIfJsonObject(value);
        if (result) {
          value = result;
        }
      }
    } else {
      name = e.name;
      value = e.value;
    }

    // Update the configuration before updating the form state
    if (configuration[name] && typeof configuration[name] === 'object' && configuration[name].hasOwnProperty('options')) {
      configuration[name] = {
        ...configuration[name],
        value: value,
      };
    } else {
      configuration[name] = value;
    }

    // Update the form state with the new value
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Update the HtmlElements or VerticalElements based on the updated configuration
    setHtmlElements((prevElements: HtmlElement[]) =>
      prevElements.map((prevElement) => {
        if (prevElement.configuration.key !== configuration.key) {
          return prevElement;
        }
        return {
          ...prevElement,
          configuration: {
            ...prevElement.configuration,
            [name]: configuration[name],
          },
        };
      })
    );

    setVerticalElements((prevElements: VerticalElement[]) =>
      prevElements.map((prevElement) => {
        if (prevElement.id !== configuration.verticalElement) {
          return prevElement;
        }

        const updatedHorizontalElements = prevElement.horizontalElements.map(
          (horizontalElement) => {
            if (horizontalElement.key !== configuration.selectedHorizontalElement) {
              return horizontalElement;
            }

            const updatedProps = horizontalElement.props.hasOwnProperty('htmlElement')
              ? {
                  ...horizontalElement.props,
                  htmlElement: {
                    ...horizontalElement.props.htmlElement,
                    configuration: {
                      ...horizontalElement.props.htmlElement.configuration,
                      [name]: configuration[name],
                    },
                  },
                }
              : {
                  ...horizontalElement.props,
                  [name]: configuration[name],
                };

            return {
              ...horizontalElement,
              props: updatedProps,
            };
          }
        );

        return {
          ...prevElement,
          horizontalElements: updatedHorizontalElements,
        };
      })
    );
  };

  const renderArrayButtons = (key: string, options: any[]) => {
    return (
      <div key={key}>
        <label>{key}:</label>
        <div>
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleChange({ name: key, value: option })}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderDropdown = (key: string, options: any[]) => {
    return (
      <div key={key} style={styles.renderInput}>
        <label>{key}:</label>
        <select name={key} value={formState[key]} onChange={handleChange}>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  };

  const renderInput = (key: string, value: any) => {
    // Handle rendering of the main input types
    if (typeof value === 'string' || typeof value === 'number') {
      return (
        <div key={key} style={styles.renderInput}>
          <label>{key}:</label>
          <AutoExpandTextarea
            name={key}
            value={formState[key]}
            onChange={handleChange}
          />
        </div>
      );
    } else if (typeof value === 'boolean') {
      return (
        <div key={key} style={styles.renderInput}>
          <label>{key}:</label>
          <input
            type="checkbox"
            name={key}
            checked={formState[key]}
            onChange={handleChange}
          />
        </div>
      );
    } else if (typeof value === 'object' && value.hasOwnProperty('value') && value.hasOwnProperty('options')) {
      // Conditionally render dropdown or buttons based on the `type`
      return value.type === 'dropdown'
        ? renderDropdown(key, value.options)
        : renderArrayButtons(key, value.options);
    } else if (typeof value === 'object' && !Array.isArray(value)) {
      const stringValue = JSON.stringify(formState[key]);
      return (
        <div key={key} style={styles.renderInput}>
          <label>{key}:</label>
          <input
            type="text"
            name={key}
            value={stringValue}
            onChange={handleChange}
          />
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div>
      {/* Render all form elements based on the new configuration structure */}
      {Object.entries(configuration).map(([key, value]) => {
        if (!(key === 'verticalElement' || key === 'selectedHorizontalElement')) {
          return renderInput(key, value);
        }
        return null;
      })}
    </div>
  );
};