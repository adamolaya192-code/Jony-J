const tracks = {
  "dont-guess": { title: "不用去猜", id: 1933996314 },
  "you-can-see": { title: "你看得见", id: 501220404 },
  "wan-jia": { title: "顽家", id: 1488796175 },
  faith: { title: "信仰", id: 1325896318 },
  "dont-guess-jazz": { title: "不用去猜 (Jazz Version)", id: 490595927 }
};

const shell = document.querySelector("#player-shell");
const title = document.querySelector("#now-title");
const status = document.querySelector("#player-status");

function clearPlayingState() {
  document.querySelectorAll(".release, .track-row").forEach((item) => item.classList.remove("playing"));
}

document.querySelectorAll(".playable").forEach((button) => {
  button.addEventListener("click", () => {
    const track = tracks[button.dataset.track];
    if (!track) return;

    clearPlayingState();
    button.closest(".release, .track-row")?.classList.add("playing");
    title.innerHTML = `${track.title}<br /><em>正在载入。</em>`;
    status.textContent = "正在载入网易云音乐站内播放器。若没有自动播放，可直接点播放器上的播放键。";

    const frame = document.createElement("iframe");
    frame.src = `https://music.163.com/outchain/player?type=2&id=${track.id}&auto=1&height=66`;
    frame.title = `Jony J《${track.title}》网易云音乐播放器`;
    frame.allow = "autoplay; encrypted-media";
    frame.loading = "eager";
    frame.setAttribute("frameborder", "0");
    shell.classList.add("is-loaded");
    shell.replaceChildren(frame);
    frame.addEventListener("load", () => {
      title.innerHTML = `${track.title}<br /><em>已在本站载入。</em>`;
      status.textContent = "播放器已在本页打开。若未自动播放，请点播放器上的播放键。";
    }, { once: true });
    document.querySelector("#listen").scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "center" });
  });
});
