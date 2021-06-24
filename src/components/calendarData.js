// Palette URL: http://paletton.com/#uid=75C0u0kqlmahHu1mqp+ueh+D9cG
const categories = [
  "Breakout",
  "Special Event",
  "Services",
  "Break",
  "Reception",
];

// const colors = [
//   "#CD3E41",
//   "#CF7E3E",
//   "#267E7B",
//   "#38A832",
//   "#AF1F23",
//   "#B1601F",
//   "#136B68",
//   "#1F8F19",
// ];

const colors = [
  "indigo",
  "teal",
  "pink",
  "green",
  "blue",
  "orange",
  "deep-purple",
];

let contributedPapersCount = 1;
let cognateSocietiesCount = 1;
let symposiaCount = 1;

class Event {
  constructor(type, name, start, end, timed, details, papers) {
    this.name = name;
    this.start = new Date(start);
    this.end = new Date(end);
    this.color = colors[type];
    this.category = categories[type];
    this.timed = timed;
    this.details = details || "Details TBD";
    this.papers = this.extractPapers(papers);
  }

  extractPapers(numArr) {
    if (!numArr) {
      return null;
    }

    const [
      contributedPapers,
      symposiumPapers,
      upssPapers,
      cognatePapers,
    ] = numArr;
    return { contributedPapers, symposiumPapers, upssPapers, cognatePapers };
  }
}

export const calData = [
  new Event(
    1,
    "Governing Board Meeting",
    "2021-11-10T09:00",
    "2021-11-10T17:00",
    true
  ),
  new Event(
    0,
    `Cognate Societies ${cognateSocietiesCount++}`,
    "2021-11-11T08:30",
    "2021-11-11T10:00",
    true,
    null,
    [0, 0, 0, 50]
  ),
  new Event(2, "☕ Coffee Break", "2021-11-11T10:00", "2021-11-11T10:15", true),
  new Event(
    0,
    `Cognate Societies ${cognateSocietiesCount++}`,
    "2021-11-11T10:15",
    "2021-11-11T11:45",
    true,
    null,
    [0, 0, 0, 50]
  ),
  new Event(
    1,
    "Interest Group Lunches",
    "2021-11-11T12:00",
    "2021-11-11T12:50",
    true
  ),
  new Event(
    0,
    `Symposia ${symposiaCount++}`,
    "2021-11-11T13:00",
    "2021-11-11T15:00",
    true,
    null,
    [0, 40]
  ),
  new Event(2, "☕ Coffee Break", "2021-11-11T15:00", "2021-11-11T15:15", true),
  new Event(
    0,
    `Contributed Papers ${contributedPapersCount++}`,
    "2021-11-11T15:15",
    "2021-11-11T16:45",
    true,
    null,
    [30]
  ),
  new Event(
    4,
    "PSA Opening Reception",
    "2021-11-11T16:45",
    "2021-11-11T17:45",
    true
  ),
  new Event(
    2,
    "Transport to Public Forum",
    "2021-11-11T17:45",
    "2021-11-11T19:00",
    true
  ),
  new Event(1, "Public Forum", "2021-11-11T19:00", "2021-11-11T20:30", true),
  new Event(
    4,
    "Welcome Reception",
    "2021-11-11T21:30:00",
    "2021-11-11T22:30:00",
    true
  ),
  //   Friday
  new Event(
    0,
    `Contributed Papers ${contributedPapersCount++}`,
    "2021-11-12T09:00",
    "2021-11-12T10:30",
    true,
    "",
    [30]
  ),
  new Event(2, "☕ Coffee Break", "2021-11-12T10:30", "2021-11-12T10:45", true),
  new Event(
    0,
    `Contributed Papers ${contributedPapersCount++} and UPSS Session`,
    "2021-11-12T10:45",
    "2021-11-12T12:15",
    true,
    null,
    [27, 0, 3]
  ),
  new Event(2, "Lunch", "2021-11-12T12:30", "2021-11-12T13:45", true),
  new Event(
    0,
    `Symposia ${symposiaCount++}`,
    "2021-11-12T14:00",
    "2021-11-12T16:00",
    true,
    null,
    [0, 40]
  ),
  new Event(
    1,
    "President's Plenary",
    "2021-11-12T16:15",
    "2021-11-12T18:15",
    true
  ),
  new Event(
    4,
    "Poster Forum and Reception",
    "2021-11-12T18:30",
    "2021-11-12T20:30",
    true
  ),
  //   Saturday
  new Event(
    0,
    `Symposia ${symposiaCount++} and Contributed Papers ${contributedPapersCount++}`,
    "2021-11-13T09:00",
    "2021-11-13T12:15",
    true,
    "Mix of 3 symposia (Women’s Caucus Prize Symposium and 2 symposia with 6 papers) and 7 contributed paper sessions – 42 papers – these could be 6 paper combinations or 3 paper sessions, as there will be a break at 10:30)",
    [42, 16]
  ),
  new Event(2, "☕ Coffee Break", "2021-11-13T10:30", "2021-11-13T10:45", true),
  new Event(2, "Lunch", "2021-11-13T12:30", "2021-11-13T13:45", true),
  new Event(
    0,
    "Women's Caucus Lunch",
    "2021-11-13T12:30",
    "2021-11-13T13:45",
    true
  ),
  new Event(
    0,
    `Symposia ${symposiaCount++} and Contributed Papers ${contributedPapersCount++}`,
    "2021-11-13T14:00",
    "2021-11-13T16:00",
    true,
    "Mix of 7 Symposia with 4 Papers + 3 Sessions with contributed papers (12 papers)",
    [12, 28]
  ),
  new Event(2, "☕ Coffee Break", "2021-11-13T16:00", "2021-11-13T16:15", true),
  new Event(
    0,
    `Contributed Papers ${contributedPapersCount++}`,
    "2021-11-13T16:15",
    "2021-11-13T17:45",
    true,
    null,
    [30]
  ),
  new Event(
    1,
    "Awards Ceremony and Presidential Address",
    "2021-11-13T18:00:00",
    "2021-11-13T20:00:00",
    true
  ),
  new Event(
    4,
    "Closing Reception",
    "2021-11-13T20:00",
    "2021-11-13T21:00",
    true
  ),
  //   Sunday
  new Event(
    0,
    `Symposia ${symposiaCount++}`,
    "2021-11-14T09:00",
    "2021-11-14T11:45",
    true,
    "Symposia with 5 papers",
    [0, 50]
  ),
  new Event(2, "☕ Coffee Break", "2021-11-14T10:00", "2021-11-14T10:15", true),
  new Event(
    1,
    "Post-Event Workshop with PEWS",
    "2021-11-14T13:00",
    "2021-11-14T16:00",
    true
  ),
];
