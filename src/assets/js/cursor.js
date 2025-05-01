let update;

export function initTrails() {
  const trace = document.createElement("div");
  trace.classList.add("trace");
  document.body.appendChild(trace);

  update = function (event) {
    const x = event.pageX || event.touches?.[0]?.pageX;
    const y = event.pageY || event.touches?.[0]?.pageY;

    const traceSize = 64;

    trace.style.left = `${x - traceSize / 2}px`;
    trace.style.top = `${y - traceSize / 2}px`;
  };

  // Attache les listeners pour suivre le mouvement
  document.addEventListener("mousemove", update);
  document.addEventListener("touchmove", update);

  // Clic = crée une mini-trace temporaire
  window.addEventListener('click', (event) => {
    const x = event.pageX;
    const y = event.pageY;

    const clickTrace = document.createElement("div");
    clickTrace.classList.add("trace-click");
    clickTrace.style.left = `${x - 32}px`;
    clickTrace.style.top = `${y - 32}px`;

    document.body.appendChild(clickTrace);

    setTimeout(() => {
      clickTrace.remove();
    }, 300);
  });
}

export function destroyTrails() {
  if (update) {
    document.removeEventListener("mousemove", update);
    document.removeEventListener("touchmove", update);
    update = null;
  }
}
