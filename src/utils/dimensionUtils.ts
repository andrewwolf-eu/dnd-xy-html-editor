export const dimensionMapping: Record<string, string[]> = {
  "FULL": ["100%"],
  "HALF-HALF": ["50%", "50%"],
  "THIRD-THIRD-THIRD": ["33%", "33%", "33%"],
  "QUARTER-QUARTER-QUARTER-QUARTER": ["25%", "25%", "25%", "25%"],
  "THIRD-TWO_THIRDS": ["33%", "67%"],
  "TWO_THIRDS-THIRD": ["67%", "33%"],
  "SEVENTH-THIRD-SEVENTH-THIRD": ["17%", "33%", "17%", "33%"],
  "THIRD-SEVENTH-THIRD-SEVENTH": ["33%", "17%", "33%", "17%"]
};

function arraysEqual(arr1: any[], arr2: any[]) {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}

export function getDimensionKeyValue(object:Record<string, string[]>, searchArray: string[]) {
  return Object.keys(object).find(key => 
    Array.isArray(object[key]) && arraysEqual(object[key], searchArray)
  );
}


export const getDimensionValue = (key: string): string[] => {
  return dimensionMapping[key] || ["100%"];
};