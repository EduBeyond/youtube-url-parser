const videoId = "NteevMLYX9s";

const tests = [
  `https://www.youtube.com/watch?v=${videoId}`,
  `https://www.youtube.com/watch?v=${videoId}&feature=youtu.be`,
  `https://www.youtube.com/watch?v=${videoId}&t=145s`,
  `https://www.youtube.com/watch?v=${videoId}&t=145s&feature=youtu.be`,
  `https://youtu.be/${videoId}`,
  `https://youtu.be/${videoId}?t=145`,
  `https://www.youtube.com/embed/${videoId}`,
  `https://www.youtube.com/embed/${videoId}?start=145`,
  `youtube.com/watch?v=${videoId}`,
  `youtube.com/watch?v=${videoId}&feature=youtu.be`,
  `youtube.com/watch?v=${videoId}&t=145s`,
  `youtube.com/watch?v=${videoId}&t=145s&feature=youtu.be`,
  `youtu.be/${videoId}`,
  `youtu.be/${videoId}?t=145`,
  `youtube.com/embed/${videoId}`,
  `youtube.com/embed/${videoId}?start=145`,
];

/*  The below array is used to check whether or not getVideoTime()
    should return a time or null. */
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

/**  ansi escape codes **/
const green = "\x1b[32m";
const red = "\x1b[31m";
const yellow = "\x1b[33m";
const grey = "\x1b[90m";

const end = "\x1b[0m";
/************************/

var successful = <boolean[]>[];

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

function test() {
  // test getVideoId()
  tests.forEach((test) => {
    const result = getVideoId(test);
    successful.push(result === videoId);
    console.log(
      `${
        result === videoId ? `${green}success${end}` : `${red}failure${end}`
      } | ${grey}${test}${end} => ${result}`
    );
  });
}

// tests for getVideoTime()
function test1() {
  tests.forEach((test) => {
    // console.log(`${(getVideoId(test) === videoId) ? `${green}success${end}` : `${red}failure${end}`} | ${test} => ${getVideoId(test)}`);
    const time = getVideoTime(test);
    // check if time should exist based on timeSuccess array
    // console.log(`${time} | ${timeSuccess[tests.indexOf(test)]}`)
    if (timeSuccess[tests.indexOf(test)]) {
      // check if time is correct
      successful.push(time === "145");
      console.log(
        `${
          time === "145" ? `${green}success${end}` : `${red}failure${end}`
        } | ${grey}${test}${end} => ${time}`
      );
    } else {
      // check if time is null
      successful.push(time === null);
      console.log(
        `${
          time === null ? `${green}success${end}` : `${red}failure${end}`
        } | ${grey}${test}${end} => ${time}`
      );
    }
  });
}

// tests for getEmbedURL()
function test2() {
  tests.forEach((test) => {
    const embedURL = getEmbedURL(test);
    successful.push(
      embedURL ===
        `https://www.youtube.com/embed/${videoId}${
          timeSuccess[tests.indexOf(test)] ? "?start=145" : ""
        }`
    );
    console.log(
      `${
        embedURL ===
        `https://www.youtube.com/embed/${videoId}${
          timeSuccess[tests.indexOf(test)] ? "?start=145" : ""
        }`
          ? `${green}success${end}`
          : `${red}failure${end}`
      } | ${grey}${test}${end} => ${embedURL}`
    );
    // console.log(`https://www.youtube.com/embed/${videoId}${timeSuccess[tests.indexOf(test)] ? "?start=145" : ""}`);
  });
}
console.log(`\n${yellow}Testing getVideoId()${end}`);
test();
console.log(`\n${yellow}Testing getVideoTime()${end}`);
test1();
console.log(`\n${yellow}Testing getEmbedURL()${end}`);
test2();

if (successful.every((x) => x === true)) {
  console.log(`\n${green}All tests successful!${end}\n\n`);
} else {
  console.log(`\n${red}Some tests failed${end}\n\n`);
}