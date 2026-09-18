(function () {
  var video = document.getElementById('hero-video');
  var items = document.querySelectorAll('.hero__crop');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!video) return;

  function restartTextAnimation() {
    if (reduceMotion) return;

    items.forEach(function (el) {
      el.style.animation = 'none';
    });

    // Force layout so the browser registers the animation being
    // removed before it's re-enabled below, otherwise the browser
    // coalesces both changes and the animation never restarts.
    void document.body.offsetHeight;

    items.forEach(function (el) {
      el.style.animation = '';
    });
  }

  // The video isn't looped natively so that its end can be used as
  // the cue to replay the text sequence in sync with it.
  video.addEventListener('ended', function () {
    restartTextAnimation();
    video.currentTime = 0;
    video.play();
  });
})();
