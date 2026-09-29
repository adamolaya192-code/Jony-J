const tracks = {
  "dont-guess": {
    title: "不用去猜",
    artist: "Jony J",
    embed: "https://embed.music.apple.com/us/song/1630228473",
    page: "https://music.apple.com/us/song/1630228473"
  },
  "you-can-see": {
    title: "你看得见",
    artist: "Jony J",
    embed: "https://embed.music.apple.com/us/song/1620154585",
    page: "https://music.apple.com/us/song/1620154585"
  },
  "wan-jia": {
    title: "顽家",
    artist: "Jony J",
    embed: "https://embed.music.apple.com/us/song/1620154228",
    page: "https://music.apple.com/us/song/1620154228"
  },
  faith: {
    title: "信仰",
    artist: "Jony J",
    embed: "https://embed.music.apple.com/us/song/1610248636",
    page: "https://music.apple.com/us/song/1610248636"
  },
  forget: {
    title: "忘了沒",
    artist: "Jony J",
    embed: "https://embed.music.apple.com/tw/song/1722577907",
    page: "https://music.apple.com/tw/song/1722577907"
  }
};

const shell = document.querySelector("#player-shell");
const title = document.querySelector("#now-title");
const status = document.querySelector("#player-status");
const appleLink = document.querySelector("#apple-link");

document.querySelectorAll(".playable").forEach((button) => {
  button.addEventListener("click", () => {
    const track = tracks[button.dataset.track];
    if (!track) return;

    document.querySelectorAll(".release").forEach((release) => release.classList.remove("playing"));
    button.closest(".release")?.classList.add("playing");
    title.innerHTML = `${track.title}<br /><em>准备播放。</em>`;
    status.textContent = "正在载入 Apple Music 官方歌曲播放器。免费试听时长、登录与完整播放权限由 Apple Music 和所在地区决定。";
    appleLink.href = track.page;

    const frame = document.createElement("iframe");
    frame.src = track.embed;
    frame.title = `${track.artist}《${track.title}》Apple Music 官方播放器`;
    frame.allow = "autoplay *; encrypted-media *; fullscreen *; clipboard-write";
    frame.loading = "eager";
    frame.referrerPolicy = "no-referrer-when-downgrade";
    frame.setAttribute("allowfullscreen", "");
    shell.replaceChildren(frame);
    frame.addEventListener("load", () => {
      title.innerHTML = `${track.title}<br /><em>官方播放器已打开。</em>`;
      status.textContent = "如果播放器没有声音或显示不可用，请检查所在地区支持情况，或在 Apple Music 页面试听。";
    }, { once: true });
    document.querySelector("#listen").scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "center" });
  });
});
