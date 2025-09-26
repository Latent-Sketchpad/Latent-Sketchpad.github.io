window.HELP_IMPROVE_VIDEOJS = false;

$(document).ready(function () {
  var options = {
    slidesToScroll: 1,
    slidesToShow: 1,
    loop: true,
    infinite: true,
    autoplay: false,   // ❌ 关闭定时自动切换
  };

  // 初始化 carousel
  var carousels = bulmaCarousel.attach('.carousel', options);
  var carousel = carousels[0]; // 只取第一个（你的页面就一个 carousel）

  // 获取所有视频
  var videos = document.querySelectorAll("#results-carousel video");

  // 监听每个视频的结束事件
  videos.forEach((video, idx) => {
    video.addEventListener("ended", () => {
      carousel.next(); // 切换到下一个
      const nextIdx = (idx + 1) % videos.length;
      videos[nextIdx].play(); // 播放下一个视频
    });
  });

  // 页面加载后自动播放第一个视频
  if (videos.length > 0) {
    videos[0].play();
  }

  bulmaSlider.attach();
});
