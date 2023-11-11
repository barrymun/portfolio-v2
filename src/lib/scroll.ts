import { appState } from "utils/state";

// Set a flag to determine if scrolling is user-initiated or programmatically controlled
let isUserScrolling: boolean = true;

// Variable to store the last known scroll position
let lastScrollTop: number = 0;

// Function to determine if the code should take over the scroll
// const shouldTakeOverScroll = (currentScrollPosition: number): boolean => {
//   // Your logic here, return true if you want to take over the scroll
//   // For example, return true if the user scrolls past a certain point
//   return currentScrollPosition > 500; // Replace with your condition
// };

// Function to relinquish control after reaching the checkpoint
// const relinquishControl = () => {
//   // Wait for the scroll to settle
//   setTimeout(() => {
//     isUserScrolling = true;
//     window.addEventListener('scroll', handleUserScroll);
//     window.removeEventListener('scroll', relinquishControl); // Remove this listener
//   }, 100); // Timeout may need to be adjusted
// };

const movePlane = (scrollY: number) => {
  if (!appState.config.val) {
    return;
  }

  // Constants for the sinusoidal movement and pitch intensity
  const amplitude = 5; // This controls the height of the loops
  const frequency = 0.002; // This controls the width of the loops
  const pitchIntensity = 20; // Adjust this factor to control the pitch intensity

  // Update background position
  appState.config.val.background.position.x = -scrollY * 0.1;

  // Sinusoidal position calculation for y-axis
  const sinusoidalY = amplitude * Math.sin(frequency * scrollY);

  // Update plane position
  appState.config.val.plane.position.y = sinusoidalY;

  // Calculate the desired pitch angle based on the slope of the sine wave
  const slope = Math.sin(frequency * scrollY);
  // Adjust pitch based on the slope and intensity factor
  let pitchAngle = slope * pitchIntensity;

  // Ensure the pitchAngle transitions smoothly
  pitchAngle *= Math.PI / 180; // Convert degrees to radians for smoother transition

  // Update plane rotation to pitch upwards or downwards
  // Using the corrected originalPitch of 90 degrees
  const originalPitch = Math.PI / 2; // 90 degrees in radians
  appState.config.val.plane.rotation.y = originalPitch - pitchAngle;

  // Set the other rotation components to their original values
  appState.config.val.plane.rotation.x = (-Math.PI / 180) * 90;
  appState.config.val.plane.rotation.z = (Math.PI / 180) * 90;
};

// Function to programmatically scroll to a checkpoint
const scrollToCheckpoint = async () => {
  console.log("X");
  const checkpoint = 2000; // Replace with the actual checkpoint value

  // window.scrollTo({
  //   top: checkpoint,
  //   behavior: 'smooth'
  // });

  let scrollPos: number = 0;
  while (scrollPos < checkpoint) {
    // window.scrollBy(0, 1);
    scrollPos += 5;
    movePlane(scrollPos);
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
