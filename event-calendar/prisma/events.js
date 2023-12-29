import { titles } from "./titles.js";
import { categories } from "./categories.js";

function createDate(year, month, day, hours = 0, minutes = 0) {
  return new Date(year, month, day, hours, minutes);
}

export const events = [
  {
    id: "1",
    categoryId: categories[0].id,
    titleId: titles[0].id,
    startAt: createDate(2023, 12, 18, 16, 30),
    endAt: createDate(2023, 12, 18, 17, 45),
    place: "オモケンパーク",
    target: "大学生・高校生",
    maximumParticipant: 8,
    fee: 500,
    description:
      "英語で楽しくお話したい人・英語学習仲間を増やしたい人・学習しながら英語を楽しく話したい人はぜひ一度参加してみてください",
  },
  {
    id: "2",
    categoryId: categories[3].id,
    titleId: titles[3].id,
    startAt: createDate(2023, 12, 10, 16, 30),
    endAt: createDate(2023, 12, 10, 18, 30),
    place: "レンタルスペース",
    target: "大学生・高校生・ALT",
    maximumParticipant: 20,
    fee: 1500,
    description: "",
  },
  {
    id: "3",
    categoryId: categories[1].id,
    titleId: titles[4].id,
    startAt: createDate(2023, 12, 18, 18, 0),
    endAt: createDate(2023, 12, 18, 18, 0),
    place: "https://podcasters.spotify.com/pod/show/enmove",
    target: "多文化共生に興味のある方・外国人の暮らしについて知りたい方",
    fee: 0,
    description:
      "地方で活躍する外国人コミュニティの声を通じて、彼らの生活・挑戦・夢・悩み・日常であまり聞かれることのない声をあなたにお届けします。",
  },
  {
    id: "4",
    categoryId: categories[0].id,
    titleId: titles[0].id,
    startAt: createDate(2023, 12, 18, 16, 30),
    endAt: createDate(2023, 12, 18, 17, 45),
    place: "オモケンパーク",
    target: "大学生・高校生",
    maximumParticipant: 8,
    fee: 500,
    description:
      "英語で楽しくお話したい人・英語学習仲間を増やしたい人・学習しながら英語を楽しく話したい人はぜひ一度参加してみてください",
  },
  {
    id: "5",
    categoryId: categories[1].id,
    titleId: titles[5].id,
    startAt: createDate(2024, 1, 28, 16, 30),
    endAt: createDate(2023, 1, 28, 17, 45),
    place: "菊池ベース",
    target: "菊池市在住の方",
    maximumParticipant: 10,
    fee: 500,
    description:
      "参加者の方が1人1品持参し、その料理を共有する企画です。いろんな国籍の方がこられるので、いろんな国の料理の文化を知り、そして味わうことができますよ",
  },
];
