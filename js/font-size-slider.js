let font_slider = document.getElementById("myRange");


font_slider.oninput = function() {
    noteground.style.fontSize = `${font_slider.value}px`;
  }
