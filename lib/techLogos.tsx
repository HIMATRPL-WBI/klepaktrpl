import React from "react";

export interface TechItem {
  id: string;
  name: string;
  category: "language" | "framework" | "tool" | "database";
  color: string;
  glow: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element;
}

export const TECH_STACK: TechItem[] = [
  {
    id: "typescript",
    name: "TypeScript",
    category: "language",
    color: "#3178c6",
    glow: "rgba(49, 120, 198, 0.4)",
    icon: (props) => (
      <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect width="128" height="128" rx="20" fill="#3178C6" />
        <path d="M72 82.5V47.5H48V56.5H55.5V82.5H72Z" fill="white" />
        <path d="M78 77C80.5 80.5 85 83 91.5 83C98.5 83 103 79.5 103 74C103 64.5 88.5 64 88.5 57C88.5 53.5 91.5 51.5 96 51.5C99.5 51.5 103 53 105.5 55L110 47.5C106.5 45 101.5 43.5 95.5 43.5C87.5 43.5 80.5 48 80.5 55.5C80.5 65.5 95.5 65.5 95.5 72.5C95.5 76 92 77.5 87.5 77.5C83.5 77.5 79.5 75.5 76.5 72.5L78 77Z" fill="white" />
      </svg>
    ),
  },
  {
    id: "python",
    name: "Python",
    category: "language",
    color: "#ffd438",
    glow: "rgba(255, 212, 56, 0.4)",
    icon: (props) => (
      <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
          d="M63.5 16C40.5 16 42 26 42 26V36.5H64.5V39.5H30.5C30.5 39.5 16 38 16 61C16 84 28.5 83 28.5 83H36V72.5C36 72.5 35.5 59.5 48.5 59.5H70.5C70.5 59.5 83 59.5 83 47V28.5C83 28.5 85 16 63.5 16ZM52.5 23C55 23 57 25 57 27.5C57 30 55 32 52.5 32C50 32 48 30 48 27.5C48 25 50 23 52.5 23Z"
          fill="#3776AB"
        />
        <path
          d="M64.5 112C87.5 112 86 102 86 102V91.5H63.5V88.5H97.5C97.5 88.5 112 90 112 67C112 44 99.5 45 99.5 45H92V55.5C92 55.5 92.5 68.5 79.5 68.5H57.5C57.5 68.5 45 68.5 45 81V99.5C45 99.5 43 112 64.5 112ZM75.5 105C73 105 71 103 71 100.5C71 98 73 96 75.5 96C78 96 80 98 80 100.5C80 103 78 105 75.5 105Z"
          fill="#FFD438"
        />
      </svg>
    ),
  },
  {
    id: "react",
    name: "React",
    category: "framework",
    color: "#61dafb",
    glow: "rgba(97, 218, 251, 0.4)",
    icon: (props) => (
      <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <circle cx="64" cy="64" r="14" fill="#61DAFB" />
        <ellipse cx="64" cy="64" rx="54" ry="20" stroke="#61DAFB" strokeWidth="6" />
        <ellipse cx="64" cy="64" rx="54" ry="20" stroke="#61DAFB" strokeWidth="6" transform="rotate(60 64 64)" />
        <ellipse cx="64" cy="64" rx="54" ry="20" stroke="#61DAFB" strokeWidth="6" transform="rotate(120 64 64)" />
      </svg>
    ),
  },
  {
    id: "rust",
    name: "Rust",
    category: "language",
    color: "#f74c00",
    glow: "rgba(247, 76, 0, 0.4)",
    icon: (props) => (
      <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <circle cx="64" cy="64" r="50" stroke="#F74C00" strokeWidth="8" strokeDasharray="14 6" />
        <circle cx="64" cy="64" r="32" fill="#F74C00" />
        <path d="M50 48H66C72 48 76 51 76 56C76 60 73 63 68 64L78 79H68L60 67H58V79H50V48ZM58 55V61H64C67 61 69 60 69 58C69 56 67 55 64 55H58Z" fill="white" />
      </svg>
    ),
  },
  {
    id: "golang",
    name: "Go",
    category: "language",
    color: "#00add8",
    glow: "rgba(0, 173, 216, 0.4)",
    icon: (props) => (
      <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect width="128" height="128" rx="20" fill="#00ADD8" />
        <path d="M42 46C30 46 22 54 22 64C22 74 30 82 42 82C52 82 58 76 60 70H42V60H70C70.5 62 71 64 71 66C71 78 61 92 41 92C23 92 11 79 11 64C11 49 23 36 42 36C52 36 60 40 66 46L58 53C54 48 49 46 42 46Z" fill="white" />
        <path d="M96 46C84 46 76 54 76 64C76 74 84 82 96 82C108 82 116 74 116 64C116 54 108 46 96 46ZM96 73C89 73 85 68 85 64C85 60 89 55 96 55C103 55 107 60 107 64C107 68 103 73 96 73Z" fill="white" />
      </svg>
    ),
  },
  {
    id: "cpp",
    name: "C++",
    category: "language",
    color: "#00599c",
    glow: "rgba(0, 89, 156, 0.4)",
    icon: (props) => (
      <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M64 12L110 38V90L64 116L18 90V38L64 12Z" fill="#00599C" />
        <path d="M52 48C43 48 37 54 37 64C37 74 43 80 52 80C58 80 63 77 66 73L72 79C67 86 59 90 51 90C36 90 26 79 26 64C26 49 36 38 51 38C60 38 67 42 72 49L66 55C63 51 58 48 52 48Z" fill="white" />
        <path d="M78 61H84V55H88V61H94V65H88V71H84V65H78V61Z" fill="#659AD2" />
        <path d="M97 61H103V55H107V61H113V65H107V71H103V65H97V61Z" fill="#659AD2" />
      </svg>
    ),
  },
  {
    id: "java",
    name: "Java",
    category: "language",
    color: "#ea2d2e",
    glow: "rgba(234, 45, 46, 0.4)",
    icon: (props) => (
      <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M48 24C48 24 58 36 44 49C36 56 42 63 42 63C42 63 56 52 48 24Z" fill="#EA2D2E" />
        <path d="M66 16C66 16 80 32 60 50C48 60 55 69 55 69C55 69 76 54 66 16Z" fill="#EA2D2E" />
        <path d="M30 84C30 84 22 89 42 92C66 95 86 94 98 88C98 88 88 98 56 99C26 100 16 93 30 84Z" fill="#5382A1" />
        <path d="M36 72C36 72 26 76 44 79C66 82 86 81 96 76C96 76 86 84 56 85C28 86 20 80 36 72Z" fill="#5382A1" />
        <path d="M90 70C104 68 112 58 106 50C100 42 88 44 88 44C88 44 98 39 108 46C118 53 114 74 88 77L90 70Z" fill="#EA2D2E" />
      </svg>
    ),
  },
  {
    id: "php",
    name: "PHP",
    category: "language",
    color: "#777bb4",
    glow: "rgba(119, 123, 180, 0.4)",
    icon: (props) => (
      <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <ellipse cx="64" cy="64" rx="58" ry="36" fill="#777BB4" />
        <path d="M36 50H46C52 50 56 53 54 58C53 63 48 66 42 66H38L34 78H26L36 50ZM39 60H43C45 60 47 59 47 57C48 55 46 54 44 54H41L39 60Z" fill="white" />
        <path d="M60 50H68L65 60H75L78 50H86L77 78H69L72 67H62L59 78H51L60 50Z" fill="white" />
        <path d="M90 50H100C106 50 110 53 108 58C107 63 102 66 96 66H92L88 78H80L90 50ZM93 60H97C99 60 101 59 101 57C102 55 100 54 98 54H95L93 60Z" fill="white" />
      </svg>
    ),
  },
  {
    id: "docker",
    name: "Docker",
    category: "tool",
    color: "#2496ed",
    glow: "rgba(36, 150, 237, 0.4)",
    icon: (props) => (
      <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect x="42" y="38" width="12" height="12" rx="2" fill="#2496ED" />
        <rect x="58" y="38" width="12" height="12" rx="2" fill="#2496ED" />
        <rect x="74" y="38" width="12" height="12" rx="2" fill="#2496ED" />
        <rect x="26" y="54" width="12" height="12" rx="2" fill="#2496ED" />
        <rect x="42" y="54" width="12" height="12" rx="2" fill="#2496ED" />
        <rect x="58" y="54" width="12" height="12" rx="2" fill="#2496ED" />
        <rect x="74" y="54" width="12" height="12" rx="2" fill="#2496ED" />
        <rect x="90" y="54" width="12" height="12" rx="2" fill="#2496ED" />
        <path d="M116 68C112 62 104 60 98 62C96 63 94 64 92 66C88 64 80 64 74 66H18C16 76 22 92 48 94C76 96 98 90 106 78C114 80 122 74 116 68Z" fill="#2496ED" />
        <circle cx="102" cy="74" r="2.5" fill="white" />
      </svg>
    ),
  },
  {
    id: "git",
    name: "Git",
    category: "tool",
    color: "#f05032",
    glow: "rgba(240, 80, 50, 0.4)",
    icon: (props) => (
      <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M121 57L71 7C67 3 61 3 57 7L45 19L59 33C63 32 68 33 71 36C74 39 75 44 74 48L88 62C92 61 97 62 100 65C104 69 104 75 100 79C96 83 90 83 86 79C83 76 82 72 83 68L70 55V83C71 85 71 87 70 89C67 94 61 95 56 92C52 89 51 83 54 79C56 76 59 74 63 74V48C59 48 56 46 54 43L40 57L7 90C3 94 3 100 7 104L57 121C61 125 67 125 71 121L121 71C125 67 125 61 121 57Z" fill="#F05032" />
        <circle cx="93" cy="72" r="7" fill="white" />
        <circle cx="67" cy="42" r="7" fill="white" />
        <circle cx="63" cy="85" r="7" fill="white" />
      </svg>
    ),
  },
  {
    id: "postgres",
    name: "PostgreSQL",
    category: "database",
    color: "#336791",
    glow: "rgba(51, 103, 145, 0.4)",
    icon: (props) => (
      <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect width="128" height="128" rx="20" fill="#336791" />
        <path d="M64 26C45 26 36 38 36 54C36 74 48 94 62 98C64 99 66 99 68 98C82 94 94 74 94 54C94 38 83 26 64 26ZM48 64C48 58 52 54 58 54C64 54 68 58 68 64C68 70 64 74 58 74C52 74 48 70 48 64Z" fill="white" />
      </svg>
    ),
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "framework",
    color: "#38bdf8",
    glow: "rgba(56, 189, 248, 0.4)",
    icon: (props) => (
      <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M34 46C40 34 50 30 62 34C71 37 77 44 83 51C88 57 93 62 102 62C112 62 118 56 122 46C116 58 106 62 94 58C85 55 79 48 73 41C68 35 63 30 54 30C44 30 38 36 34 46ZM6 82C12 70 22 66 34 70C43 73 49 80 55 87C60 93 65 98 74 98C84 98 90 92 94 82C88 94 78 98 66 94C57 91 51 84 45 77C40 71 35 66 26 66C16 66 10 72 6 82Z" fill="#38BDF8" />
      </svg>
    ),
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "language",
    color: "#f7df1e",
    glow: "rgba(247, 223, 30, 0.4)",
    icon: (props) => (
      <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect width="128" height="128" rx="20" fill="#F7DF1E" />
        <path d="M36 94C38 97 42 99 48 99C56 99 60 95 60 87V48H48V86C48 90 46 91 43 91C40 91 38 90 36 88L36 94Z" fill="#000000" />
        <path d="M68 93C72 97 78 100 87 100C98 100 105 94 105 85C105 73 89 71 89 63C89 59 93 57 98 57C102 57 106 59 109 62L112 54C108 50 103 48 97 48C87 48 78 54 78 64C78 77 94 78 94 87C94 91 90 93 85 93C80 93 75 90 71 86L68 93Z" fill="#000000" />
      </svg>
    ),
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "framework",
    color: "#ffffff",
    glow: "rgba(255, 255, 255, 0.4)",
    icon: (props) => (
      <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <circle cx="64" cy="64" r="64" fill="black" />
        <path d="M102 108L52 44H42V84H50V54L94 110C97 108 99 106 102 103V108Z" fill="white" />
        <rect x="76" y="44" width="8" height="40" fill="white" />
      </svg>
    ),
  },
];

export const CODE_SNIPPETS = [
  "const trpl = new Future();",
  "async function innovate()",
  "import { code } from 'trpl';",
  "fn build_software() -> Success",
  "SELECT * FROM future_engineers;",
  "git commit -m 'feat: next-gen'",
  "npm run dev --trpl",
  "while (learning) { levelUp(); }",
  "<SoftwareEngineer ready={true} />",
  "console.log('Hello, World!');",
  "docker compose up -d",
  "interface Developer { passion: 100 }",
];
