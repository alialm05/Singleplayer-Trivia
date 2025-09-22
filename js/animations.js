function restartBarAnimation() {
  const bar = document.getElementById('bar');
  bar.style.animation = 'none';
  bar.offsetHeight; // Force reflow
  bar.style.animation = 'shrinkBar 15s linear forwards';
}

function endBarAnimation() {
  const bar = document.getElementById('bar');
  bar.style.animation = 'none';
  bar.offsetHeight; // Force reflow
  bar.style.width = '0%';
  console.log("Bar animation ended");
}

function animateChoicesPopUp() {
  const choices = document.querySelectorAll('.choice');
 
  choices.forEach((btn, i) => {
    btn.classList.remove('pop-up'); // Reset if needed
    setTimeout(() => {
      btn.classList.add('pop-up');
    }, i * 100); // Staggered effect (optional)
  });
}

// Call this function whenever you show the choices
// Example: after updating question/answers
//animateChoicesPopUp();

export { restartBarAnimation, endBarAnimation, animateChoicesPopUp };