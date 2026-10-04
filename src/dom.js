export function createElement(tag, options = {}) {
  const { className, text, attrs = {}, children = [], on = {} } = options;

  const element = document.createElement(tag);

  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;

  Object.entries(attrs).forEach(([name, value]) => {
    element.setAttribute(name, value);
  });

  Object.entries(on).forEach(([eventName, handler]) => {
    element.addEventListener(eventName, handler);
  });

  element.append(...children);

  return element;
}

export function createButton(text, onClick, className = 'btn') {
  return createElement('button', {
    className,
    text,
    attrs: { type: 'button' },
    on: { click: onClick },
  });
}
