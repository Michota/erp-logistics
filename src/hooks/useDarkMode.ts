const bodyTag = document.body;

const DARK_MODE_SELECTOR = "dark";

function useDarkMode() {
  const enable = () => bodyTag.classList.add(DARK_MODE_SELECTOR);
  const disable = () => bodyTag.classList.remove(DARK_MODE_SELECTOR);
  const toggle = () => bodyTag.classList.toggle(DARK_MODE_SELECTOR);

  return { enable, disable, toggle };
}

export { useDarkMode };
