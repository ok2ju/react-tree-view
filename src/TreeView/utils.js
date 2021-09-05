export const reducer = (state, newState) => ({ ...state, ...newState });

const curry = (fn) => {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    }

    return (...args1) => {
      return curried(...(args.concat(args1)));
    };
  };
};

export const traverseTree = curry((reducerFn, initialValue, currItem) => {
  if (Array.isArray(currItem)) {
    return currItem.reduce(traverseTree(reducerFn), [])
  }

  const acc = reducerFn(initialValue, currItem);

  if (!currItem.children || !currItem.children.length) {
    return acc;
  }

  return currItem.children.reduce(traverseTree(reducerFn), acc);
});
