import React from "react";
import { dimensionMapping, getDimensionValue, getDimensionKeyValue } from "../utils/dimensionUtils";
import { useEditor } from "../context/EditorContext";

export const handleDimensionChange = (
  event: React.ChangeEvent<HTMLSelectElement>,
  verticalElementId: number,
  updateVerticalElementDimension: (verticalElementId: number, dimensions: string[]) => void
) => {
  const layout = event.target.value;
  console.log({ layout })
  const dimensions = getDimensionValue(layout);
  updateVerticalElementDimension(verticalElementId, dimensions);
};

const DimensionSelector = ({
  verticalElementId
}: { verticalElementId: number }) => {
  const { verticalElements, updateVerticalElementDimension } = useEditor();

  return (
    <select
      value={getDimensionKeyValue(
        dimensionMapping,
        verticalElements.find((verticalElement) => verticalElement.id === verticalElementId)?.dimensions ?? []
      )}
      onChange={(event) =>
        handleDimensionChange(event, verticalElementId, updateVerticalElementDimension)
      }>
      <option value="FULL">100%</option>
      <option value="HALF-HALF">50% - 50%</option>
      <option value="THIRD-THIRD-THIRD">33% - 33% - 33%</option>
      <option value="QUARTER-QUARTER-QUARTER-QUARTER">25% - 25% - 25% - 25%</option>
      <option value="THIRD-TWO_THIRDS">33% - 67%</option>
      <option value="TWO_THIRDS-THIRD">67% - 33%</option>
      <option value="SEVENTH-THIRD-SEVENTH-THIRD">17% - 33% - 17% - 33%</option>
      <option value="THIRD-SEVENTH-THIRD-SEVENTH">33% - 17% - 33% - 17%</option>
    </select>
  );
};

export default DimensionSelector;
