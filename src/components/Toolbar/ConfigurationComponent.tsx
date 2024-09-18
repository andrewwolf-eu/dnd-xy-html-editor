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
  let renderedInputCount = 0
  const { setHtmlElements, setVerticalElements } = useEditor();

  // Initialize formState with the `value` from each key in configuration
  const getInitialState = () => {
    const initialState: { [key: string]: any } = {};

    for (const key in configuration) {
      if (configuration.hasOwnProperty(key) && key !== 'customAction') {
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

      if (e.target instanceof HTMLInputElement) {
        if (e.target.type === 'checkbox') {
          value = e.target.checked;
        }
        else if (e.target.type === 'number') {
          const isValidNumber = value !== '' && /^[+-]?\d+(\.\d+)?$/.test(value);
          if (isValidNumber) {
            value = parseFloat(value);
          } else {
            return;
          }
        }
        else {
          const result = parseIfJsonObject(value);
          if (result) {
            value = result;
          }
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

  const getLabel = (key: string) => {
    const label = configuration && configuration.keyLabels && configuration.keyLabels[key]
    return label ? label : key
  }

  const renderDropdown = (key: string, options: any[]) => {
    return (
      <select name={key} value={formState[key]} onChange={handleChange}>
        {options.sort().map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  };

  const renderArrayButtons = (key: string, options: any[]) => {
    return (
      <div>
        {options.sort().map((option, index) => (
          <button
            type='button'
            key={index}
            onClick={() => handleChange({ name: key, value: option.value })}
          >
            {option.label}
          </button>
        ))}
      </div>
    );
  };

  const stringInput = (key: string) => {
    return (
      <AutoExpandTextarea
        name={key}
        value={formState[key]}
        onChange={handleChange}
      />
    );
  }

  const numberInput = (key: string, value: any) => {
    return (
      <input
        type="number"
        name={key}
        step="1"
        value={formState[key]}
        onChange={handleChange}
      />
    )
  }

  const booleanInput = (key: string) => {
    return (
      <input
        type="checkbox"
        name={key}
        checked={formState[key]}
        onChange={handleChange}
      />
    );
  }

  const optionsInput = (key: string, value: any) => {
    return value.type === 'dropdown'
      ? renderDropdown(key, value.options)
      : renderArrayButtons(key, value.options);
  }

  const objectInput = (key: string) => {
    const stringValue = JSON.stringify(formState[key]);
    return (
      <input
        type="text"
        name={key}
        value={stringValue}
        onChange={handleChange}
      />
    );
  }

  const renderInput = (key: string, value: any) => {
    switch (typeof value) {
      case 'string':
        return stringInput(key)
      case 'number':
        return numberInput(key, value)
      case 'boolean':
        return booleanInput(key)
      case 'object':
        if (value !== null && value.hasOwnProperty('value') && value.hasOwnProperty('options')) {
          return optionsInput(key, value)
        } else if (value !== null && !Array.isArray(value)) {
          objectInput(key)
        }
      default:
        return null
    }
  };

  const updateKeyValue = ({ key, value }: { key: string, value: string }) => {
    setFormState((prevState) => ({
      ...prevState,
      [key]: value,
    }));

    handleChange({ name: key, value: value })
  };

  return (
    <div>
      {Object.entries(configuration).map(([key, value]) => {
        if ((key === 'verticalElement' ||
          key === 'selectedHorizontalElement' ||
          key === 'elementIdentifier' ||
          key === 'key' ||
          key === 'keyLabels' ||
          key === 'hideKeysFromConfiguration' ||
          key === 'children' ||
          configuration && configuration.hideKeysFromConfiguration && configuration.hideKeysFromConfiguration.includes(key))) {
          return null
        }
        if (key === 'customAction') {
          return <div key={key}>{configuration[key](updateKeyValue)}</div>;
        }
        renderedInputCount += 1;
        return <div key={key} style={styles.renderInput}>
          {renderedInputCount > 1 && <div style={styles.divider} />}
          <label style={styles.renderInputLabel}>{getLabel(key)}:</label>
          {renderInput(key, value)}
        </div>
      })}
    </div>
  );
};