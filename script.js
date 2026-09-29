const tracks = {
  "dont-guess": {
    title: "不用去猜",
    videoId: "PQYVfWZ07PQ",
    page: "https://www.youtube.com/watch?v=PQYVfWZ07PQ"
  },
  "you-can-see": {
    title: "你看得见",
    videoId: "6FvYOsDDJvI",
    page: "https://www.youtube.com/watch?v=6FvYOsDDJvI"
  },
  "wan-jia": {
    title: "顽家",
    videoId: "4nIkgUydo2Q",
    page: "https://www.youtube.com/watch?v=4nIkgUydo2Q"
  },
  faith: {
    title: "信仰",
    videoId: "a_FewszE0iE",
    page: "https://www.youtube.com/watch?v=a_FewszE0iE"
  },
  "dont-guess-jazz": {
    title: "不用去猜 (Jazz Version)",
    videoId: "_l7XHnaC1tU",
    page: "https://www.youtube.com/watch?v=_l7XHnaC1tU"
  }
};

const shell = document.querySelector("#player-shell");
const title = document.querySelector("#now-title");
const status = document.querySelector("#player-status");
const platformLink = document.querySelector("#platform-link");

function clearPlayingState() {
  document.querySelectorAll(".release, .track-row").forEach((item) => item.classList.remove("playing"));
}

document.querySelectorAll(".playable").forEach((button) => {
  button.addEventListener("click", () => {
    const track = tracks[button.dataset.track];
    if (!track) return;

    clearPlayingState();
    button.closest(".release, .track-row")?.classList.add("playing");
    title.innerHTML = `${track.title}<br /><em>准备播放。</em>`;
    status.textContent = "正在载入 YouTube 官方播放器。播放受 YouTube 在你所在网络环境的可用性影响。";
    platformLink.href = track.page;

    const frame = document.createElement("iframe");
    frame.src = `https://www.youtube-nocookie.com/embed/${track.videoId}?rel=0`;
    frame.title = `Jony J《${track.title}》YouTube 官方播放器`;
    frame.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    frame.loading = "eager";
    frame.referrerPolicy = "strict-origin-when-cross-origin";
    frame.setAttribute("allowfullscreen", "");
    shell.replaceChildren(frame);
    frame.addEventListener("load", () => {
      title.innerHTML = `${track.title}<br /><em>播放器已载入。</em>`;
      status.textContent = "如果视频不可播放，请检查网络是否能访问 YouTube，或打开官方 YouTube 页面。";
    }, { once: true });
    document.querySelector("#listen").scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "center" });
  });
});
