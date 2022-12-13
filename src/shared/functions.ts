export function omitNullAndUndefinedValues(object) {
    const newObject = {};
    for (const f in object) {
      if (object[f] === null || object[f] === undefined) {
        continue;
      }
      newObject[f] = object[f];
    }
    return newObject;
  }