# YouTube URL Parser

Idk how to publish an npm module

simple regex function in src/app.ts

Below are all the test cases I ran, but it could probably take more because its regex...

If the function is broken for you feel free to make a pull request (or not) to fix it or add some features

```ts
const tests = [
  "https://www.youtube.com/watch?v=8lcsBV4es50",
  "https://www.youtube.com/watch?v=8lcsBV4es50&feature=youtu.be",
  "https://www.youtube.com/watch?v=8lcsBV4es50&t=145s",
  "https://www.youtube.com/watch?v=8lcsBV4es50&t=145s&feature=youtu.be",
  "https://youtu.be/8lcsBV4es50",
  "https://youtu.be/8lcsBV4es50?t=145",
  "https://www.youtube.com/embed/8lcsBV4es50",
  "https://www.youtube.com/embed/8lcsBV4es50?start=145",
  "youtube.com/watch?v=8lcsBV4es50",
  "youtube.com/watch?v=8lcsBV4es50&feature=youtu.be",
  "youtube.com/watch?v=8lcsBV4es50&t=145s",
  "youtube.com/watch?v=8lcsBV4es50&t=145s&feature=youtu.be",
  "youtu.be/8lcsBV4es50",
  "youtu.be/8lcsBV4es50?t=145",
  "youtube.com/embed/8lcsBV4es50",
  "youtube.com/embed/8lcsBV4es50?start=145",
];
```