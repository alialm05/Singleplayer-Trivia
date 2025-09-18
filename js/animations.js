function restartBarAnimation() {
  const bar = document.getElementById('bar');
  bar.style.animation = 'none';
  bar.offsetHeight; // Force reflow
  bar.style.animation = 'shrinkBar 5s linear forwards';
}