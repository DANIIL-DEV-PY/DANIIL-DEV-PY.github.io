// Точка входа страницы: рисует хедер/футер, затем запускает моторику.

window.initSite = function (base) {
  base = base || '';
  renderComponents(base);
  if (window.initMotion) window.initMotion();
};
