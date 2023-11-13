import { movePlaneUpAndDown } from "lib/plane";
import { getPeriod } from "utils/helpers";

let isUserScrolling: boolean = true;
let lastScrollTop: number = 0; // store the last known scroll position

// Function to programmatically scroll to a checkpoint
const scrollToCheckpoint = async () => {
  const checkpoint = getPeriod(0.002);
  console.log({ checkpoint });

  let scrollPos: number = 0;
  while (scrollPos < checkpoint) {
    scrollPos += 8;
    movePlaneUpAndDown(scrollPos);
    await new Promise((resolve) => setTimeout(resolve, 1));
  }

  // After scrolling to the checkpoint, give control back to the user
  // window.addEventListener('scroll', relinquishControl);
};

// Function to handle user scroll
const handleUserScroll = (_event: Event) => {
  // Determine the direction of the scroll
  const st = window.scrollY || document.documentElement.scrollTop;
  const direction = st > lastScrollTop ? "down" : "up";
  lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling

  if (isUserScrolling) {
    isUserScrolling = false;
    console.log(`User is scrolling ${direction}.`);
    // Your logic to determine if you want to take over the scroll
    // if (shouldTakeOverScroll(st)) {

    // }

    window.removeEventListener("scroll", handleUserScroll); // Temporarily remove the listener

    scrollToCheckpoint(); // Your function to scroll to a checkpoint
  }
};

export { handleUserScroll };
