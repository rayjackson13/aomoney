export const clickOutside = (element: Node, cb: () => void) => {
  const onClick = (event: Event) => {
    if (!element.contains(event.target as Node)) {
      cb();
    }
  };
  
  document.body.addEventListener('click', onClick);
  
  return {
    update(callback: () => void) {
      cb = callback;
    },
    destroy() {
      document.body.removeEventListener('click', onClick);
    }
  };
};
