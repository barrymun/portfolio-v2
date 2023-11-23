/* eslint-disable max-len */
import { Project } from "utils/types";

export const repoUrl: string = "https://github.com/barrymun/portfolio-v2";
export const projectInfoCardId: string = "project-info-card";
export const githubProjects: Project[] = [
  {
    url: "https://github.com/barrymun/music-visualizer-v2",
    title: "Music visualizer made with TypeScript and HTML canvas",
    description:
      "This application utilizes the VanJS reactive framework in combination with TypeScript and the HTML Canvas API to create a dynamic and engaging music visualizer.",
  },
  {
    url: "https://github.com/barrymun/pdf-merger",
    title: "Upload and merge PDFs into a single, downloadable PDF",
    description:
      "PDF Merger is a simple tool that allows you to upload multiple PDF files, reorder them as needed, and download the result as a single merged PDF file.",
  },
  {
    url: "https://github.com/barrymun/image-to-pdf",
    title: "Convert JPG, PNG and more to PDF",
    description:
      "This tool is designed to simplify the process of converting various image formats, including JPG and PNG, into a unified PDF format.",
  },
  {
    url: "https://github.com/barrymun/image-to-greyscale",
    title: "A tool that converts images to greyscale.",
    description:
      "A handy tool that converts your colorful images to greyscale. Simply upload an image and get a live preview of it. Click the convert button to transform the image into greyscale and view the result immediately. Once satisfied, you can download the greyscale image at the click of a button.",
  },
  {
    url: "https://github.com/barrymun/division-game",
    title: "Division Game is an interactive game where players are tested on their ability to divide numbers",
    description:
      "Division Game is an interactive game where players are tested on their ability to divide numbers. Written in TypeScript and using ViteJS for development and bundling.",
  },
];

export const positionOffset: number = 6;

// constants for the dock
export const dockPositionOffet: number = 0.02;
export const initialDockXPosition: number = 0;
export const initialDockZPosition: number = -5;

export const straightAndLevelPosition: number = Math.PI / 2;
// constants for the sinusoidal movement and pitch intensity
export const pitchAmplitude: number = 3; // This controls the height of the loops
export const pitchFrequency: number = 0.002; // This controls the width of the loops
export const pitchIntensity: number = 20; // Adjust this factor to control the pitch intensity
// constants for the rocking motion
export const rollAmplitude: number = (Math.PI / 180) * 30; // 30 degrees in radians
export const rollFrequency: number = 0.0025; // Adjust this for how quickly you want the craft to rock
// constants for the backflip motion
export const flipFrequency: number = pitchFrequency;
// constants for the hover motion
export const hoverAmplitude: number = (Math.PI / 180) * 5;
export const hoverFrequency: number = 0.003;
// constants for the turn motion
export const turnOffset: number = 0.01;
export const turnBankAngle: number = 30;
export const turnFullRotation: number = Math.PI;
// constants for stars
export const starSpeedNormal: number = 0.3;
export const starSpeedFast: number = 5.0;

export const defaultSvgAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  "stroke-width": 2,
  stroke: "currentColor",
  fill: "none",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
};
