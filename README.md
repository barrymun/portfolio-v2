# Interactive 3D Portfolio Showcase with Spacecraft Maneuvers

This portfolio showcases a spacecraft navigating through a dynamic 3D environment, highlighting a collection of diverse projects. Users can seamlessly navigate between projects using next and previous arrow buttons, with the spacecraft performing captivating maneuvers during each transition. Upon page load, a randomized sequence of maneuvers adds an element of surprise. The background features a starfield that responds to the user's cursor or finger on mobile devices, gracefully moving aside to provide an immersive viewing experience.

## Testing

[Vite](https://vitejs.dev/) is used for our project, and our testing suite is located in the `tests` directory at the root of the project. The testing framework used is [Vitest](https://vitest.dev/).

### Running Tests

All tests are run automatically before code is committed with pre-commit hooks. See [husky](https://typicode.github.io/husky/) for details.

To run the tests, follow these steps:

1. **Open a Terminal**: Open a terminal window in your project directory.

2. **Execute Tests**: Use the following command to run your tests using Yarn:

```bash
yarn test
```

## TODO List

- [ ] Add a comet
- [ ] Add a planet/moon that rotates in the background
- [ ] Support for localisation

### In Progress

### Completed

- [x] Create the scene using ThreeJS
  - [x] De-prioritise the ThreeJS relative to the background canvas (`pointer-events: none;`)
- [x] Craft
  - [x] Hover
  - [x] Perform turns
  - [x] Perform manoeuvres
- [x] Dock
  - [x] Should move around the scene a little
- [x] Background
  - [x] Add stars that follow the mouse
  - [x] Stars move faster when the craft is performing a manoeuvre and slow down when the manoeuvre is coming to an end
  - [x] Stars stop following the mouse when the mouse leaves the background canvas
- [x] Misc
  - [x] Handle resize events for all elements
  - [x] Make the previous/next buttons smaller on mobile
  - [x] Fix the icons for the previous/next buttons
  - [x] Create a details card CSS element for these projects
  - [x] Add the details of at least 3 projects
  - [x] Choose a custom font to fit the theme (Poppins)
  - [x] Change favicon
  - [x] Add `touchstart` and `touchend` event listeners

## Credits

### GLB Assets

- Jet by jeremy [CC-BY](https://creativecommons.org/licenses/by/3.0/) via [Poly Pizza](https://poly.pizza/m/6fyLMORhgGK)
- International Space Station by Poly by Google [CC-BY](https://creativecommons.org/licenses/by/3.0/) via [Poly Pizza](https://poly.pizza/m/d3Fq5H6ne8E)
- Comet by Poly by Google [CC-BY](https://creativecommons.org/licenses/by/3.0/) via [Poly Pizza](https://poly.pizza/m/ffzZSJOorck)
- Planet by [Quaternius](https://poly.pizza/m/9g1aIbfR9Y)
- Moon by Poly by Google [CC-BY](https://creativecommons.org/licenses/by/3.0/) via [Poly Pizza](https://poly.pizza/m/9OPocAqXM0u)
