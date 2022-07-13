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

const timeSuccess = [
  false,
  false,
  true,
  true,
  false,
  true,
  false,
  true,
  false,
  false,
  true,
  true,
  false,
  true,
  false,
  true,
];

const videoId = "8lcsBV4es50";

const getVideoId = (url: string) => {
  const regex = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regex);
  return match && match[2].length === 11 ? match[2] : null;
};

const getVideoTime = (url: string) => {
  const regex = /[?&]t=([0-9]+)/;
  const regex2 = /[?&]start=([0-9]+)/;
  const match = url.match(regex);
  const match2 = url.match(regex2);
  return match ? match[1] : match2 ? match2[1] : null;
};

export const getEmbedURL = (url: string) => {
  const videoId = getVideoId(url);
  const videoTime = getVideoTime(url);
  return videoId
    ? `https://www.youtube.com/embed/${videoId}${
        videoTime ? `?start=${videoTime}` : ""
      }`
    : null;
};

// tests for getVideoTime()
function test1() {
  tests.forEach((test) => {
    // console.log(`${(getVideoId(test) === videoId) ? "success" : "failure"} | ${test} => ${getVideoId(test)}`);
    const time = getVideoTime(test);
    // check if time should exist based on timeSuccess array
    // console.log(`${time} | ${timeSuccess[tests.indexOf(test)]}`)
    if (timeSuccess[tests.indexOf(test)]) {
      // check if time is correct
      console.log(
        `${time === "145" ? "success" : "failure"} | ${test} => ${time}`
      );
    } else {
      // check if time is null
      console.log(
        `${time === null ? "success" : "failure"} | ${test} => ${time}`
      );
    }
  });
}

// tests for getEmbedURL()
function test2() {
  tests.forEach((test) => {
    const embedURL = getEmbedURL(test);
    console.log(
      `${
        embedURL ===
        `https://www.youtube.com/embed/${videoId}${
          timeSuccess[tests.indexOf(test)] ? "?start=145" : ""
        }`
          ? "success"
          : "failure"
      } | ${test} => ${embedURL}`
    );
    // console.log(`https://www.youtube.com/embed/${videoId}${timeSuccess[tests.indexOf(test)] ? "?start=145" : ""}`);
  });
}
