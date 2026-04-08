export function slugifyLeetcodeTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getLeetcodeUrl(problem: { title: string }): string {
  return `https://leetcode.com/problems/${slugifyLeetcodeTitle(problem.title)}/`;
}
