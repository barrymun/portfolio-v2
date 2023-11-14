import { performManoeuvre } from "lib/plane";
// import { ScrollDirection } from "utils/types";

let canUserScroll: boolean = true;
// let lastScrollTop: number = 0; // store the last known scroll position
// let direction: ScrollDirection = "down";

const scrollToCheckpoint = async () => {
  // setDirection(direction);
  // lastScrollTop

  Object.assign(document.body.style, { height: `100%`, overflow: `hidden` });
  window.scrollTo(0, 0);

  await performManoeuvre();

  // reattach the listener
  window.addEventListener("scroll", handleUserScroll);
  // allow the user to scroll again
  canUserScroll = true;

  Object.assign(document.body.style, { height: `calc(100vh + 1px)`, overflow: `visible` });
};

const handleUserScroll = (event: Event) => {
  // console.log(event);
  // event.preventDefault();

  // determine the direction of the scroll
  // const st = window.scrollY || document.documentElement.scrollTop;
  // direction = st > lastScrollTop ? "down" : "up";
  // lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling

  if (!canUserScroll) {
    event.preventDefault();
    return;
  }

  canUserScroll = false;
  // console.log(`User is scrolling ${direction}.`);
  // temporarily remove the listener
  window.removeEventListener("scroll", handleUserScroll);
  scrollToCheckpoint();
};

export { handleUserScroll };
