const videoId = "NteevMLYX9s";

/*  The below array is used to check whether or not getVideoTime()
    should return a time or null. */

// refactor test list into an array of objects like

// below array holds all data for tests
// { url: string, time: boolean }
const testList = [
  { url: `https://www.youtube.com/watch?v=${videoId}`, time: false },
  {
    url: `https://www.youtube.com/watch?v=${videoId}&feature=youtu.be`,
    time: false,
  },
  {
    url: `https://www.youtube.com/watch?v=${videoId}&t=145s`,
    time: true,
  },
  {
    url: `https://www.youtube.com/watch?v=${videoId}&t=145s&feature=youtu.be`,
    time: true,
  },
  { url: `https://youtu.be/${videoId}`, time: false },
  { url: `https://youtu.be/${videoId}?t=145`, time: true },
  { url: `https://www.youtube.com/embed/${videoId}`, time: false },
  {
    url: `https://www.youtube.com/embed/${videoId}?start=145`,
    time: true,
  },
  { url: `youtube.com/watch?v=${videoId}`, time: false },
  {
    url: `youtube.com/watch?v=${videoId}&feature=youtu.be`,
    time: false,
  },
  { url: `youtube.com/watch?v=${videoId}&t=145s`, time: true },
  {
    url: `youtube.com/watch?v=${videoId}&t=145s&feature=youtu.be`,
    time: true,
  },
  { url: `youtu.be/${videoId}`, time: false },
  { url: `youtu.be/${videoId}?t=145`, time: true },
  { url: `youtube.com/embed/${videoId}`, time: false },
  { url: `youtube.com/embed/${videoId}?start=145`, time: true },
  { url: `https://www.youtube.com/shorts/${videoId}`, time: false },
  {
    url: `https://www.youtube.com/shorts/${videoId}?t=145`,
    time: true,
  },
  {
    url: `https://www.youtube.com/shorts/${videoId}?t=145&feature=youtu.be`,
    time: true,
  },
  { url: `youtube.com/shorts/${videoId}`, time: false },
  { url: `youtube.com/shorts/${videoId}?t=145`, time: true },
  {
    url: `youtube.com/shorts/${videoId}?t=145&feature=youtu.be`,
    time: true,
  },
];

/**  ansi escape codes **/
const green = "\x1b[32m";
const red = "\x1b[31m";
const yellow = "\x1b[33m";
const grey = "\x1b[90m";

const end = "\x1b[0m";
/************************/

var successful = <boolean[]>[];

const getVideoId = (url: string) => {
  // const regex = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  // include https://www.youtube.com/shorts/videoId
  const regex =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regex);
  return match && match[2].length === 11 ? match[2] : null;
};

const parseVideoTime = (url: string) => {
  const regex = /[?&]t=([0-9]+)/;
  const regex2 = /[?&]start=([0-9]+)/;
  const match = url.match(regex);
  const match2 = url.match(regex2);
  return match ? match[1] : match2 ? match2[1] : null;
};

export const getEmbedURL = (url: string) => {
  const videoId = getVideoId(url);
  const videoTime = parseVideoTime(url);
  return videoId
    ? `https://www.youtube.com/embed/${videoId}${
        videoTime ? `?start=${videoTime}` : ""
      }`
    : null;
};

function test() {
  testList.forEach((test) => {
    const result = getVideoId(test.url);
    successful.push(result === videoId);
    console.log(
      `${
        result === videoId ? `${green}success${end}` : `${red}failure${end}`
      } | ${grey}${test.url}${end} => ${result}`
    );
  });
}

// tests for getVideoTime()
function test1() {
  testList.forEach((test) => {
    const time = parseVideoTime(test.url);
    if (test.time) {
      successful.push(time === "145");
      console.log(
        `${
          time === "145" ? `${green}success${end}` : `${red}failure${end}`
        } | ${grey}${test.url}${end} => ${time}`
      );
    } else {
      successful.push(time === null);
      console.log(
        `${
          time === null ? `${green}success${end}` : `${red}failure${end}`
        } | ${grey}${test.url}${end} => ${time}`
      );
    }
  });
}

function test2() {
  testList.forEach((test) => {
    const embedURL = getEmbedURL(test.url);
    successful.push(
      embedURL ===
        `https://www.youtube.com/embed/${getVideoId(test.url)}${
          test.time ? "?start=145" : ""
        }`
    );
    console.log(
      `${
        embedURL ===
        `https://www.youtube.com/embed/${getVideoId(test.url)}${
          test.time ? "?start=145" : ""
        }`
          ? `${green}success${end}`
          : `${red}failure${end}`
      } | ${grey}${test.url}${end} => ${embedURL}`
    );
  });
}

console.log(`\n${yellow}Testing getVideoId()${end}`);
test();
console.log(`\n${yellow}Testing parseVideoTime()${end}`);
test1();
console.log(`\n${yellow}Testing getEmbedURL()${end}`);
test2();

if (successful.every((x) => x === true)) {
  console.log(`\n${green}All tests successful!${end}\n\n`);
} else {
  // console.log(`\n${red}Some tests failed${end}\n\n`);
  // count number of failed tests
  const failed = successful.filter((x) => x === false);
  console.log(`\n${red}${failed.length} tests failed${end}\n\n`);
}
