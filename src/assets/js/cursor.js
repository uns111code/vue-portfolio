let update;

export function initTrails() {
  update = function (event) {
    const trace = document.createElement("div");
    trace.classList.add("trace");

    const x = event.pageX || event.touches?.[0]?.pageX;
    const y = event.pageY || event.touches?.[0]?.pageY;

    trace.style.left = `${x}px`;
    trace.style.top = `${y}px`;

    document.body.appendChild(trace);

    setTimeout(() => {
      trace.remove();
    }, 500);
  };

  document.addEventListener("mousemove", update);
  document.addEventListener("touchmove", update);
}

export function destroyTrails() {
  if (update) {
    document.removeEventListener("mousemove", update);
    document.removeEventListener("touchmove", update);
    update = null;
  }
}
