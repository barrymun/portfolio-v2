import { appState } from "utils/state";
import { Star } from "utils/types";

const canvas = document.createElement("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d")!;
const numStars: number = 300;
const interactionDistance: number = 100; // px
const stars: Star[] = [];

const drawStars = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  for (const star of stars) {
    ctx.beginPath();
    ctx.arc(star.x, star.y, 2, 0, Math.PI * 2);
    ctx.fill();
  }
};

const handleMouseMove = (e: MouseEvent) => {
  const mouseX = e.clientX - canvas.getBoundingClientRect().left;
  const mouseY = e.clientY - canvas.getBoundingClientRect().top;

  for (const star of stars) {
    const distance = Math.sqrt((star.x - mouseX) ** 2 + (star.y - mouseY) ** 2);

    if (distance < interactionDistance) {
      // Move the star away from the mouse pointer
      star.x += (star.x - mouseX) * 0.02;
      star.y += (star.y - mouseY) * 0.02;
    } else {
      // Revert to the original position
      star.x += (star.originalX - star.x) * 0.02;
      star.y += (star.originalY - star.y) * 0.02;
    }
  }

  drawStars();
};

canvas.addEventListener("mousemove", handleMouseMove);

const initBackground = () => {
  // create random stars
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      originalX: 0,
      originalY: 0,
    });
  }

  // initialize the original positions
  for (const star of stars) {
    star.originalX = star.x;
    star.originalY = star.y;
  }

  appState.background.val = canvas;
};

const renderBackground = () => {
  drawStars();
};

export { initBackground, renderBackground };
