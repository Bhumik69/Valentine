const images = [
  new URL("./bg_image.png", import.meta.url).href,
  new URL("./date.jpg", import.meta.url).href,
  new URL("./food.jpg", import.meta.url).href,
  new URL("./Snugles.png", import.meta.url).href,
  new URL("./surprise.png", import.meta.url).href,
];

export function preloadImages() {
  images.forEach((src) => {
    const img = new Image();
    img.src = src;

    // helps avoid first-render delay
    (img as any).decode?.().catch(() => {});
  });
}
