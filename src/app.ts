const getVideoId = (url: string) => {
  const regex = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
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

const getEmbedURL = (url: string) => {
  const videoId = getVideoId(url);
  const videoTime = parseVideoTime(url);
  return videoId
    ? `https://www.youtube.com/embed/${videoId}${
        videoTime ? `?start=${videoTime}` : ""
      }`
    : null;
};