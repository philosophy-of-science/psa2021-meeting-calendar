// Palette URL: http://paletton.com/#uid=75C0u0kqlmahHu1mqp+ueh+D9cG
const categories = [
  "Breakout",
  "Special Event",
  "Services",
  "Break",
  "Reception",
];
const colors = [
  "#AF1F23",
  "#B1601F",
  "#136B68",
  "#1F8F19",
  "#640003",
  "#652D00",
  "#003D3B",
  "#045200",
];
let contributedPapersCount = 1;
let cognateSocietiesCount = 1;
let symposiaCount = 1;

class Event {
  constructor(type, name, start, end, timed, details, sessions, papers) {
    this.name = name;
    this.start = new Date(start);
    this.end = new Date(end);
    this.color = colors[type];
    this.category = categories[type];
    this.timed = timed;
    this.sessions = sessions;
    this.papers = papers;
    this.papersPerSession =
      this.sessions && this.papers ? this.sessions / this.papers : null;
    this.details = details || "Details TBD";
  }
}

export const calData = [
  new Event(
    0,
    `Cognate Societies ${cognateSocietiesCount++}`,
    "2021-11-11T08:30",
    "2021-11-11T10:00",
    true
  ),
  new Event(2, "☕ Coffee Break", "2021-11-11T10:00", "2021-11-11T10:15", true),
  new Event(
    0,
    `Cognate Societies ${cognateSocietiesCount++}`,
    "2021-11-11T10:15",
    "2021-11-11T11:45",
    true
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
    "?",
    4
  ),
  new Event(2, "☕ Coffee Break", "2021-11-11T15:00", "2021-11-11T15:15", true),
  new Event(
    0,
    `Contributed Papers ${contributedPapersCount++}`,
    "2021-11-11T15:15",
    "2021-11-11T16:45",
    true,
    null,
    10,
    3
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
    30
  ),
  new Event(2, "☕ Coffee Break", "2021-11-12T10:30", "2021-11-12T10:45", true),
  new Event(
    0,
    `Contributed Papers ${contributedPapersCount++}`,
    "2021-11-12T10:45",
    "2021-11-12T12:15",
    true,
    30
  ),
  new Event(2, "Lunch", "2021-11-12T12:30", "2021-11-12T13:45", true),
  new Event(
    0,
    `Symposia ${symposiaCount++}`,
    "2021-11-12T14:00",
    "2021-11-12T16:00",
    true
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
    true
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
    true
  ),
  new Event(2, "☕ Coffee Break", "2021-11-13T16:00", "2021-11-13T16:15", true),
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
    true
  ),
  new Event(2, "☕ Coffee Break", "2021-11-14T10:00", "2021-11-14T10:15", true),
  new Event(
    1,
    "Post-Event Workshop",
    "2021-11-14T13:00",
    "2021-11-14T16:00",
    true
  ),
];
