function toggleFade(position) {
  const el = $('.site-header');
  position > 200 ? el.addClass('opaque') : el.removeClass('opaque');
}

function scrollHandler() {
  toggleFade($(this).scrollTop());
}

$(document).ready(scrollHandler);
$(document).scroll(scrollHandler);
