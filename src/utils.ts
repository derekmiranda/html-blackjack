export function merge(target: any, source: any): any {
  for (let key of Object.keys(source)) {
    // is object - recursively merge
    if (
      source[key] &&
      typeof source[key] === "object" &&
      !Array.isArray(source[key])
    ) {
      target[key] = merge(target[key] || {}, source[key]);
    }
    // is array - clone
    else if (Array.isArray(source[key])) {
      target[key] = source[key].slice();
    } else {
      target[key] = source[key];
    }
  }
  return target;
}
