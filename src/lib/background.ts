import van from "vanjs-core";

import { starSpeedFast, starSpeedNormal } from "utils/constants";
import { appState } from "utils/state";
import { Star } from "utils/types";

const canvas = document.createElement("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d")!;
const numStars: number = 400;
const interactionDistance: number = 100; // px

let orientationSign: number = appState.planeDirection.val === "right" ? -1 : 1;
let stars: Star[] = [];
let mousePosition: { x: number; y: number } | undefined = undefined;

van.derive(() => {
  orientationSign = appState.planeDirection.val === "right" ? -1 : 1;
  appState.starMovementSpeed.val = appState.isPerformingManoeuvre.val ? starSpeedFast : starSpeedNormal;
});

const drawStars = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  for (const star of stars) {
    ctx.beginPath();
    ctx.arc(star.x, star.y, 2, 0, Math.PI * 2);
    ctx.fill();
  }
};

const moveStars = () => {
  // use closure here to avoid repeating the same code
  const revertToOriginalPosition = (star: Star) => {
    // revert to the original position
    star.x += (star.originalX - star.x) * 0.02;
    star.y += (star.originalY - star.y) * 0.02;
  };

  for (const star of stars) {
    // move the stars, including wrapping around the screen
    star.x += orientationSign * appState.starMovementSpeed.val;
    if (star.x > canvas.width) {
      star.x = 0;
    } else if (star.x < 0) {
      star.x = canvas.width;
    }

    // also handle the original position
    star.originalX += orientationSign * appState.starMovementSpeed.val;
    if (star.originalX > canvas.width) {
      star.originalX = 0;
    } else if (star.originalX < 0) {
      star.originalX = canvas.width;
    }

    if (!mousePosition) {
      revertToOriginalPosition(star);
      // we want to exit early here
      continue;
    }

    const distance = Math.sqrt((star.x - mousePosition.x) ** 2 + (star.y - mousePosition.y) ** 2);
    if (distance < interactionDistance) {
      // move the stars in a circular path outside the interaction distance
      const angle = Math.atan2(star.y - mousePosition.y, star.x - mousePosition.x);
      const randomAngleOffset: number = Math.random() * (Math.PI / 6);
      const randomRadiusOffset: number = Math.random() * 10;
      const randomDistanceOffset: number = interactionDistance + randomRadiusOffset;
      const targetX = mousePosition.x + randomDistanceOffset * Math.cos(angle + randomAngleOffset);
      const targetY = mousePosition.y + randomDistanceOffset * Math.sin(angle + randomAngleOffset);

      // gradually move the star towards the target position
      star.x += (targetX - star.x) * 0.02;
      star.y += (targetY - star.y) * 0.02;
    } else {
      revertToOriginalPosition(star);
    }
  }
};

const handleMouseMove = (e: MouseEvent) => {
  const mouseX = e.clientX - canvas.getBoundingClientRect().left;
  const mouseY = e.clientY - canvas.getBoundingClientRect().top;

  for (const star of stars) {
    const distance = Math.sqrt((star.x - mouseX) ** 2 + (star.y - mouseY) ** 2);

    if (distance < interactionDistance) {
      // move the star away from the mouse pointer
      star.x += (star.x - mouseX) * 0.02;
      star.y += (star.y - mouseY) * 0.02;
    } else {
      // revert to the original position
      star.x += (star.originalX - star.x) * 0.02;
      star.y += (star.originalY - star.y) * 0.02;
    }
  }

  mousePosition = {
    x: mouseX,
    y: mouseY,
  };
};

const handleMouseLeave = () => {
  mousePosition = undefined;
};

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
  moveStars();
};

const handleResizeBackground = () => {
  // reset canvas
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // reset stars
  stars = [];
  // reinitialize
  initBackground();
};

canvas.addEventListener("mousemove", handleMouseMove);
canvas.addEventListener("mouseleave", handleMouseLeave);

export { initBackground, renderBackground, handleResizeBackground };
