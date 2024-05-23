export const appendCSSLink = (href) => {
  const el = document.createElement("link");
  el.rel = "stylesheet";
  el.href = href;
  document.body.appendChild(el);
};