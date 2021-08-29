const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

function togglePlay() {
	const method = video.paused ? "play" : "pause";
	video[method]();
}

function togglePlayButton() {
	const icon = video.paused ? "►" : "❚ ❚";
	toggle.textContent = icon;
}

function skip() {
	video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
	const name = this.name;
	video[name] = this.value;
}

function handleProgress() {
	const percent = (video.currentTime / video.duration) * 100;
	progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
	const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = scrubTime;
}

// Toggle pause/play video
video.addEventListener("click", togglePlay);
toggle.addEventListener("click", togglePlay);

// Toggle pause play icon
video.addEventListener("pause", togglePlayButton);
video.addEventListener("play", togglePlayButton);

// Skip button functionality
skipButtons.forEach((button) => button.addEventListener("click", skip));

// Volumne and Speed slider functionality
ranges.forEach((range) => range.addEventListener("change", handleRangeUpdate));
ranges.forEach((range) => range.addEventListener("move", handleRangeUpdate));

// Updating video progress bar
video.addEventListener("timeupdate", handleProgress);

// Scrub video forward/backward
let mousedown = false;
progress.addEventListener("click", scrub);

// Scrub by holding the click and moving
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
