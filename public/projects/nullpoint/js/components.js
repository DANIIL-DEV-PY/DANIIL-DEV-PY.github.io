// Хедер и футер — общая разметка, вставляется на любой странице.

(function () {
  var LOGO_MARK = (
    '<svg class="logo-mark" viewBox="0 0 64 64" aria-hidden="true">' +
    '<g stroke="currentColor" stroke-width="6" stroke-linecap="square" fill="none">' +
    '<line x1="32" y1="8" x2="32" y2="56"/>' +
    '<line x1="8" y1="32" x2="56" y2="32"/>' +
    '</g>' +
    '<rect x="26" y="26" width="12" height="12" fill="#B4DD63"/>' +
    '</svg>'
  );

  function headerHtml(base) {
    return (
      '<div class="container">' +
        '<a href="' + base + 'index.html" class="logo">' + LOGO_MARK + 'Nullpoint</a>' +
        '<nav class="nav-links" aria-label="Основная навигация">' +
          '<a href="#device">Продукт</a>' +
          '<a href="#how">Технология</a>' +
          '<a href="#intel">Приложение</a>' +
          '<a href="#footer">Бренд</a>' +
        '</nav>' +
        '<button type="button" class="btn btn-primary header-cta" data-open-waitlist>' +
          '<span class="btn-label">Лист ожидания</span>' +
          '<span class="btn-overlay" aria-hidden="true"></span>' +
        '</button>' +
      '</div>'
    );
  }

  function footerHtml() {
    return (
      '<div class="container">' +
        '<div class="footer-top">' +
          '<div class="footer-brand">' +
            '<a href="index.html" class="logo">' + LOGO_MARK + 'Nullpoint</a>' +
            '<p>Носимый термостат для тела. Греет, когда холодно. Охлаждает, когда жарко. Учится у каждого, кто его носит.</p>' +
          '</div>' +
          '<div class="footer-cols">' +
            '<div class="footer-col">' +
              '<span class="footer-col-title">Продукт</span>' +
              '<a href="#device">Устройство</a>' +
              '<a href="#intel">Приложение</a>' +
              '<a href="#how">Технология</a>' +
              '<a href="#" data-open-waitlist>Бренд-кит</a>' +
            '</div>' +
            '<div class="footer-col">' +
              '<span class="footer-col-title">Компания</span>' +
              '<a href="#" data-open-waitlist>О нас</a>' +
              '<a href="#" data-open-waitlist>Карьера</a>' +
              '<a href="#" data-open-waitlist>Блог</a>' +
              '<a href="#" data-open-waitlist>Контакты</a>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="footer-bottom">' +
          '<span>© ' + new Date().getFullYear() + ' Nullpoint. Все права защищены.</span>' +
          '<span>Условия использования · Конфиденциальность</span>' +
        '</div>' +
      '</div>'
    );
  }

  function modalHtml() {
    return (
      '<div class="modal-overlay hidden" id="waitlist-modal">' +
        '<div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="waitlist-title">' +
          '<button type="button" class="modal-close" aria-label="Закрыть">✕</button>' +
          '<h2 id="waitlist-title">Встань в лист ожидания</h2>' +
          '<p class="modal-subtitle">Оставь email — сообщим, когда откроется доступ к устройству в твоём регионе.</p>' +
          '<form class="pill-form" novalidate>' +
            '<input class="pill-input" type="email" required autocomplete="email" placeholder="Твой email" aria-label="Email" />' +
            '<button type="submit" class="btn btn-primary pill-btn">' +
              '<span class="btn-label">Отправить</span>' +
              '<span class="btn-overlay" aria-hidden="true"></span>' +
            '</button>' +
          '</form>' +
          '<p class="modal-note">Без спама. Одно письмо, когда откроется доступ.</p>' +
        '</div>' +
      '</div>'
    );
  }

  window.renderComponents = function (base) {
    base = base || '';
    var header = document.getElementById('site-header');
    var footer = document.getElementById('footer');
    if (header) header.innerHTML = headerHtml(base);
    if (footer) footer.innerHTML = footerHtml();
    document.body.insertAdjacentHTML('beforeend', modalHtml());
  };
})();
