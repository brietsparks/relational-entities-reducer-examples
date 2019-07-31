export const randomString = () => Math.random().toString(36).slice(-5);

export const getOrdinalData = (array, item, byValue) => {
  const index = byValue ? array.indexOf(item) : item;

  const isFirst = index < 1;
  const isLast = index >= array.length - 1;
  const prev = index > 0 ? array[index - 1] : undefined;
  const next = index < array.length - 1 ? array[index + 1] : undefined;

  return { isFirst, isLast, prev, next }
};

export const noop = () => {};

export const isHexColor = value =>  /^#[0-9A-F]{6}$/i.test(value);
