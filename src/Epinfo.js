import React from "react";

function Epinfo({ ep }) {
  const killWord = [
    "720p",
    "1080p",
    "AMZN",
    "WEB=DL",
    "DDP5",
    "1 H",
    "264-NTb",
    "EZTV",
    "0 H",
    "x264",
    "-ViSUM",
    "-mSD",
    "-BTW",
    "HDTV",
    "-MiNX",
    "x265",
    "WEB-DL",
    "-PHOENiX",
    "iP",
    "AAC2",
    "264",
    "-MTB",
    "-BRISK",
    "WEBRip",
    "1 x",
    "480p",
    "-FoV",
    "Av",
    "Kolos",
    "-KETTLE"
  ];

  const imgRoot = "https://eztv.io/ezimg/thumbs/";

  var titleString = ep.title
    .replace(/Doctor Who 2005 S\d+E\d+/g, "", "")
    .trim();

  killWord.forEach(word => {
    titleString = titleString.replace(word, "");
  });

  titleString = titleString.trim();

  var imgSrc = imgRoot + ep.small_screenshot.replace("//ezimg.ch/thumbs/", "");

  if (titleString === "") titleString = ep.title;

  return (
    <div>
      <div>{titleString}</div>
      <img src={imgSrc} alt={titleString} title={titleString} />
      <div>
        정보 : {ep.season}시즌 {ep.episode}화
      </div>
    </div>
  );
}

export default Epinfo;
