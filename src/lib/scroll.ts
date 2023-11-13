import { performBackflip, pitchFrequency } from "lib/plane";
import { getPeriod } from "utils/helpers";

let canUserScroll: boolean = true;
let lastScrollTop: number = 0; // store the last known scroll position

// Function to programmatically scroll to a checkpoint
const scrollToCheckpoint = async () => {
  const checkpoint = getPeriod(pitchFrequency);
  // const checkpoint = getPeriod(rollFrequency);
  console.log({ checkpoint });

  let scrollPos: number = 0;
  while (scrollPos < checkpoint) {
    scrollPos += 8;
    // movePlaneUpAndDown(scrollPos);
    // movePlaneLeftAndRight(scrollPos);
    performBackflip(scrollPos);
    await new Promise((resolve) => setTimeout(resolve, 1));
  }

  // Reattach the listener
  window.addEventListener("scroll", handleUserScroll);
  canUserScroll = true;
};

// Function to handle user scroll
const handleUserScroll = (_event: Event) => {
  // Determine the direction of the scroll
  const st = window.scrollY || document.documentElement.scrollTop;
  const direction = st > lastScrollTop ? "down" : "up";
  lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling

  if (canUserScroll) {
    canUserScroll = false;
    console.log(`User is scrolling ${direction}.`);
    // Your logic to determine if you want to take over the scroll
    // if (shouldTakeOverScroll(st)) {

    // }

    window.removeEventListener("scroll", handleUserScroll); // temporarily remove the listener

    scrollToCheckpoint(); // Your function to scroll to a checkpoint
  }
};

export { handleUserScroll };
