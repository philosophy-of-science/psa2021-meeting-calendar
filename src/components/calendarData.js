// Palette URL: http://paletton.com/#uid=75C0u0kqlmahHu1mqp+ueh+D9cG\

const cal = require("./sessions.json");
export let paperCount = 0,
  authorCount = 0;
export const catMap = new Map();

catMap.set("All", {
  name: "All",
  icon: "mdi-expand-all",
  color: "orange",
});

catMap.set("In-Person Presentation", {
  name: "In-Person Presentation",
  icon: "mdi-account",
  color: "pink",
});

catMap.set("Hybrid Presentation", {
  name: "Hybrid Presentation",
  icon: "mdi-video-account",
  color: "indigo",
});

catMap.set("Remote Presentation", {
  name: "Remote Presentation",
  icon: "mdi-wifi",
  color: "blue",
});

catMap.set("Poster Forum and Reception", {
  name: "Poster Forum and Reception",
  icon: "mdi-presentation",
  color: "red",
});

catMap.set("Special Event", {
  name: "Special Event",
  icon: "mdi-star-circle",
  color: "deep-purple",
});

catMap.set("Coffee Break", {
  name: "Coffee Break",
  icon: "mdi-coffee",
  color: "teal",
});

catMap.set("Registration", {
  name: "Registration",
  icon: "mdi-account-plus",
  color: "green",
});

catMap.set("Book Exhibit", {
  name: "Book Exhibit",
  icon: "mdi-bookshelf",
  color: "light-blue",
});

catMap.set("Childcare", {
  name: "Childcare",
  icon: "mdi-baby-carriage",
  color: "light-green",
});

catMap.set("Nursing Mothers' Room", {
  name: "Nursing Mothers' Room",
  icon: "mdi-mother-nurse",
  color: "deep-orange",
});

catMap.set("Lunch", {
  name: "Lunch",
  icon: "mdi-food",
  color: "cyan",
});

class Event {
  constructor(
    name,
    start,
    end,
    timed,
    location,
    details,
    track,
    authors,
    subs,
    format
  ) {
    this.name = name;
    this.category = this.formatter(format);
    this.start = new Date(start);
    this.end = new Date(end);
    this.timed = timed;
    this.location = location;
    this.details = this.createExcerpt(details);
    this.track = track;
    this.authors = this.splitStr(",", authors);
    this.subs = this.splitStr("|", subs);

    this.icon = catMap.get(this.category).icon || "mdi-expand-all";
    this.color = catMap.get(this.category).color || "red";
    this.papersAndAuthors = this.papers(this.authors, this.subs);
  }

  createExcerpt(txt) {
    if (!txt) return null;
    const txtWithoutNewlines = txt.replace("\n", " ").replace(/<[^>]+>/g, " ");
    if (txt.length < 255) return txtWithoutNewlines;
    const lastWord = txtWithoutNewlines.indexOf(" ", 254);
    return txtWithoutNewlines.substring(0, lastWord) + "...";
  }
  splitStr(delimiter, str) {
    if (!str) return null;
    return str.split(delimiter);
  }

  formatter(format) {
    if (format) return format;
    if (this.name === "Coffee Break") return "Coffee Break";
    if (this.name === "Poster Forum and Reception")
      return "Poster Forum and Reception";
    if (this.name === "Registration") return "Registration";
    if (this.name === "Book Exhibit") return "Book Exhibit";
    if (this.name === "Childcare") return "Childcare";
    if (this.name === "Nursing Mothers' Room") return "Nursing Mothers' Room";
    if (/Lunch/.exec(this.name)) return "Lunch";
    return "Services";
  }

  papers(authors, papers) {
    if (!authors || !papers) return null;

    const papersAndAuthors = papers
      .filter((paper) => paper !== "")
      .map((paper, idx) => {
        paperCount++;
        authorCount++;
        return { title: paper, author: authors[idx] };
      });
    return papersAndAuthors;
  }
}

export const calData = cal.map((session) => {
  const start = session.date + ":" + session.start;
  const end = session.date + ":" + session.end;
  return new Event(
    session.name,
    start,
    end,
    true,
    session.venue,
    session.abstract,
    session.track,
    session.authors,
    session.subs,
    session.format
  );
});
