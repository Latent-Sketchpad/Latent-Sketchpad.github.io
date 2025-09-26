window.HELP_IMPROVE_VIDEOJS = false;

$(document).ready(function () {
  // ========== 如果页面还有别的轮播，继续初始化它们（排除视频这个容器） ==========
  var options = {
    slidesToScroll: 1,
    slidesToShow: 1,
    loop: true,
    infinite: true,
    autoplay: true,        // 其他轮播保留自动切换
    autoplaySpeed: 5000,
  };
  // 关键：不要把 #results-carousel 选进去
  bulmaCarousel.attach('.carousel:not(#results-carousel)', options);

  bulmaSlider.attach();

  // ========== 我们自己的“视频播完再切”的控制 ==========
  const container = document.querySelector('#results-carousel');
  if (!container) return;

  const items = Array.from(container.querySelectorAll('.item'));
  const videos = items.map(it => it.querySelector('video'));
  let idx = 0;

  // 初始化：只显示第一个
  function show(i) {
    items.forEach((el, k) => {
      el.classList.toggle('is-active', k === i);
    });
  }

  function playCurrent() {
    const v = videos[idx];
    if (!v) return;
    // 确保允许自动播放
    v.muted = true;
    v.setAttribute('playsinline', '');
    v.currentTime = 0;
    const p = v.play();
    if (p && typeof p.catch === 'function') {
      p.catch(() => {
        // 某些浏览器可能需要用户手势；保持静音可最大化自动播放成功率
      });
    }
  }

  // 监听每个视频的结束，切到下一个并播放
  videos.forEach((v, i) => {
    if (!v) return;
    v.removeAttribute('loop'); // 确保会触发 ended
    v.addEventListener('ended', () => {
      idx = (i + 1) % videos.length;
      show(idx);
      playCurrent();
    });
  });

  // 首屏：显示并播放第一个
  show(0);
  playCurrent();
});