// Rotating tech, software engineering, and computer science quotes shown
// on the idle screen of Klepak TRPL when no idle YouTube video is configured.
export type IdleQuote = { text: string; author: string };

export const TECH_QUOTES: IdleQuote[] = [
  { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
  { text: "The most dangerous phrase in the language is: We've always done it this way.", author: "Grace Hopper" },
  { text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: "Martin Fowler" },
  { text: "Programs must be written for people to read, and only incidentally for machines to execute.", author: "Harold Abelson" },
  { text: "Sometimes it is the people no one can imagine anything of who do the things no one can imagine.", author: "Alan Turing" },
  { text: "UNIX is basically a simple operating system, but you have to be a genius to understand the simplicity.", author: "Dennis Ritchie" },
  { text: "Premature optimization is the root of all evil.", author: "Donald Knuth" },
  { text: "Simplicity is prerequisite for reliability.", author: "Edsger W. Dijkstra" },
  { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
  { text: "One of my most productive days was throwing away 1,000 lines of code.", author: "Ken Thompson" },
  { text: "Debugging is twice as hard as writing the code in the first place.", author: "Brian Kernighan" },
  { text: "There was no choice but to be pioneers; no time to be a beginner.", author: "Margaret Hamilton" },
  { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
  { text: "Code is read much more often than it is written.", author: "Guido van Rossum" },
  { text: "Good code is its own best documentation.", author: "Steve McConnell" },
  { text: "Focus is a matter of deciding what things you're not going to do.", author: "John Carmack" },
  { text: "Truth can only be found in one place: the code.", author: "Robert C. Martin" },
  { text: "There are only two kinds of languages: the ones people complain about and the ones nobody uses.", author: "Bjarne Stroustrup" },
  { text: "What one programmer can do in one month, two programmers can do in two months.", author: "Fred Brooks" },
  { text: "The Web as I envisaged it, we have not seen it yet. The future is still so much bigger than the past.", author: "Tim Berners-Lee" },
  { text: "The function of good software is to make the complex appear to be simple.", author: "Grady Booch" },
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { text: "Experience is the name everyone gives to their mistakes.", author: "Oscar Wilde" },
  { text: "Knowledge is power, but sharing software empowers everyone.", author: "Hima TRPL" },
  { text: "Stay curious, keep debugging, and never stop building.", author: "Syafrizal Amri Fajar" },
];

// Alias for backward compatibility with existing imports
export const ENTREPRENEUR_QUOTES = TECH_QUOTES;

// Picks a random index, avoiding an immediate repeat of `exclude`.
export function randomQuoteIndex(exclude?: number): number {
  if (TECH_QUOTES.length <= 1) return 0;
  let next = Math.floor(Math.random() * TECH_QUOTES.length);
  if (next === exclude) next = (next + 1) % TECH_QUOTES.length;
  return next;
}
