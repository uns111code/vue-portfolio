let update;

export function initTrails() {
  const trace = document.createElement("div");
  trace.classList.add("trace");

  update = function (event) {

    

    const x = event.pageX || event.touches?.[0]?.pageX;
    const y = event.pageY || event.touches?.[0]?.pageY;

  // Pour centrer le div.trace par rapport à la position de la souris
  const traceSize = 64; // La taille de trace (on prend ici 20px pour l'exemple)

  // On ajuste la position du trace pour le centrer
  trace.style.left = `${x - traceSize / 2}px`;
  trace.style.top = `${y - traceSize / 2}px`;

    document.body.appendChild(trace);


    
    window.addEventListener('click', () => {
      trace.style.background = 'var(--primary-color)';
            // Supprimer traceOnClick après 500ms
            setTimeout(() => {
              trace.style.background = 'none';
            }, 100);
    });
  

    
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
