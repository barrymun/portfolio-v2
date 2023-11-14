import { performManoeuvre } from "lib/plane";
import { ScrollDirection } from "utils/types";

let canUserScroll: boolean = true;
let lastScrollTop: number = 0; // store the last known scroll position
let direction: ScrollDirection = "down";

const scrollToCheckpoint = async () => {
  // setDirection(direction);
  // lastScrollTop

  await performManoeuvre("backflip");

  // reattach the listener
  window.addEventListener("scroll", handleUserScroll);
  // allow the user to scroll again
  canUserScroll = true;
};

const handleUserScroll = (_event: Event) => {
  // determine the direction of the scroll
  const st = window.scrollY || document.documentElement.scrollTop;
  direction = st > lastScrollTop ? "down" : "up";
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
