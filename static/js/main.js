// Replaces the theme's jQuery-based main.js: same entrance animation, no dependencies.
(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Fade in the sidebar, grouped by tag like the original theme (all links appear together)
  var items = document.querySelectorAll('.sidebar .main-info *:not(svg):not(svg *)');
  var firstIndexByTag = {};
  items.forEach(function (el, i) {
    if (!(el.tagName in firstIndexByTag)) firstIndexByTag[el.tagName] = i;
    var delay = reduceMotion ? 0 : 110 * firstIndexByTag[el.tagName];
    setTimeout(function () { el.classList.add('bs'); }, delay);
  });

  setTimeout(function () {
    document.querySelectorAll('.main-content').forEach(function (el) {
      el.classList.add('active');
    });
  }, reduceMotion ? 0 : 1100);

  // Assemble email links that are stored reversed in the HTML (see partials/email-link.html)
  document.querySelectorAll('.js-email').forEach(function (link) {
    var address = link.getAttribute('data-reversed').split('').reverse().join('');
    link.href = 'mailto:' + address;
    var text = link.querySelector('.js-email-text');
    if (text) text.textContent = address;
  });
})();
