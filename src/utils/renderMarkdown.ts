import { remark } from 'remark';
import html from 'remark-html';

export async function renderMarkdown(markdownText: string): Promise<string> {
  const result = await remark().use(html).process(markdownText);
  return result.toString(); // HTML string
}
