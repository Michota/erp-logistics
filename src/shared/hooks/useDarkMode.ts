const htmlTag = document.documentElement;

const DARK_MODE_SELECTOR = "dark";

function useDarkMode() {
  const enable = () => htmlTag.classList.add(DARK_MODE_SELECTOR);
  const disable = () => htmlTag.classList.remove(DARK_MODE_SELECTOR);
  const toggle = () => htmlTag.classList.toggle(DARK_MODE_SELECTOR);

  return { enable, disable, toggle };
}

export { useDarkMode };
