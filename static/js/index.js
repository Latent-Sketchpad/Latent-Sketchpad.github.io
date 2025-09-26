window.HELP_IMPROVE_VIDEOJS = false;

$(document).ready(function () {
  // 初始化 carousel，但禁用定时自动切换
  var options = {
    slidesToScroll: 1,
    slidesToShow: 1,
    loop: true,
    infinite: true,
    autoplay: false   // 关键：禁用内置自动播放
  };
  var carousels = bulmaCarousel.attach('#results-carousel', options);
  var carousel = carousels[0]; // 只取第一个

  // 获取所有视频
  const videos = Array.from(document.querySelectorAll('#results-carousel video'));

  // 确保第一个视频自动开始播放
  function playVideoAt(index) {
    videos.forEach((v, i) => {
      v.pause();
      v.currentTime = 0;
    });
    const v = videos[index];
    if (v) {
      v.muted = true;
      v.setAttribute('playsinline', '');
      v.play().catch(() => {});
    }
  }

  // 监听每个视频结束 → 切到下一个
  videos.forEach((v, i) => {
    v.addEventListener('ended', () => {
      let next = (i + 1) % videos.length;
      carousel.scrollTo(next);   // bulmaCarousel 提供的方法
      playVideoAt(next);
    });
  });

  // 首屏启动第一个视频
  playVideoAt(0);
});