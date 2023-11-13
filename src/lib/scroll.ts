import {
  // movePlaneLeftAndRight,
  // movePlaneUpAndDown,
  performBackflip,
} from "lib/plane";
import { flipFrequency, scrollOffset } from "utils/constants";
import { getPeriod } from "utils/helpers";

let canUserScroll: boolean = true;
let lastScrollTop: number = 0; // store the last known scroll position

const scrollToCheckpoint = async () => {
  // const checkpoint = getPeriod(pitchFrequency);
  // const checkpoint = getPeriod(rollFrequency);
  const checkpoint = getPeriod(flipFrequency);

  let scrollPos: number = 0;
  while (scrollPos < checkpoint) {
    scrollPos += scrollOffset;
    // movePlaneUpAndDown(scrollPos);
    // movePlaneLeftAndRight(scrollPos);
    performBackflip(scrollPos);
    await new Promise((resolve) => setTimeout(resolve, 1));
  }

  // Reattach the listener
  window.addEventListener("scroll", handleUserScroll);
  canUserScroll = true;
};

const handleUserScroll = (_event: Event) => {
  // Determine the direction of the scroll
  const st = window.scrollY || document.documentElement.scrollTop;
  const direction = st > lastScrollTop ? "down" : "up";
  lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling

  if (canUserScroll) {
    canUserScroll = false;
    console.log(`User is scrolling ${direction}.`);
    // temporarily remove the listener
    window.removeEventListener("scroll", handleUserScroll);
    scrollToCheckpoint();
  }
};

export { handleUserScroll };
