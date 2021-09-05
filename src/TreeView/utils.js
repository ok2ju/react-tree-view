export const reducer = (state, newState) => ({ ...state, ...newState });

export const traverseTree = (reducerFn) => (initialValue, currItem) => {
  if (Array.isArray(currItem)) {
    return currItem.reduce(traverseTree(reducerFn), [])
  }

  const acc = reducerFn(initialValue, currItem);

  if (!currItem.children || !currItem.children.length) {
    return acc;
  }

  return currItem.children.reduce(traverseTree(reducerFn), acc);
};
