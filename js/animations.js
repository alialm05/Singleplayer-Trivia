function restartBarAnimation() {
  const bar = document.getElementById('bar');
  bar.style.animation = 'none';
  bar.offsetHeight; // Force reflow
  bar.style.animation = 'shrinkBar 15s linear forwards';
}

function endBarAnimation() {
  const bar = document.getElementById('bar');
  bar.style.width = '0%';

}

export { restartBarAnimation, endBarAnimation };