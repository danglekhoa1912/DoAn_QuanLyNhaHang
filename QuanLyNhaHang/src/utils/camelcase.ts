import {camelCase, isArray, isObject, transform} from 'lodash';

export default function formatCamelCase(obj: any) {
  return transform(obj, (acc: any, value: any, key: any, target: any) => {
    const camelKey = isArray(target) ? key : camelCase(key);
    acc[camelKey] = isObject(value) ? formatCamelCase(value) : value;
  });
}
