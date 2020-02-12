import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import magnetImg from "./images/magnet-icon-5.png";
import torrentImg from "./images/download_11.png";

function onClipCopy(text, result) {
  if (result) {
    alert("정보가 클립보드에 복사되었습니다.");
  } else {
    alert(
      "클립보드에 복사하는데 실패했습니다.\n보안상 지원하지 않거나 호환되지 않는 기능입니다.\n아이콘의 링크 정보를 수동으로 복사해주시기 바랍니다."
    );
  }
}

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
  if (titleString === "") titleString = ep.title;

  var imgSrc = imgRoot + ep.small_screenshot.replace("//ezimg.ch/thumbs/", "");

  var infoString = "";
  if (ep.title.indexOf("720p") > 0) {
    infoString = "720p";
  } else if (ep.title.indexOf("1080p") > 0) {
    infoString = "1080p";
  } else {
    infoString = "";
  }

  var megaSizeString = Math.floor(ep.size_bytes / 1024);

  return (
    <div className="epInfo">
      <img
        src={imgSrc}
        alt={titleString}
        title={titleString}
        className="epInfo__poster"
      />
      <div className="epInfo__container">
        <div className="epInfo__title">
          {titleString}
          <span>
            {ep.season}시즌 {ep.episode}화 {infoString}
          </span>
        </div>
        <div>
          {ep.filename}
          <span>({megaSizeString})</span>
          <span>{megaSizeString}</span>
        </div>
        <div>
          <a
            href={ep.magnet_url}
            className="epInfo__magnet"
            alt="마그넷 링크"
            title="마그넷 링크"
          >
            <img src={magnetImg} />
          </a>
          <CopyToClipboard text={ep.magnet_url} onCopy={onClipCopy}>
            <button>마그넷 링크 복사하기</button>
          </CopyToClipboard>
        </div>
        <div>
          <a
            href={ep.torrent_url}
            className="epInfo__download"
            alt="토렌트 파일 링크"
            title="토렌트 파일 링크"
          >
            <img src={torrentImg} />
          </a>
          <CopyToClipboard text={ep.torrent_url} onCopy={onClipCopy}>
            <button>토렌트 파일 링크 복사하기</button>
          </CopyToClipboard>
        </div>
      </div>
    </div>
  );
}

export default Epinfo;
