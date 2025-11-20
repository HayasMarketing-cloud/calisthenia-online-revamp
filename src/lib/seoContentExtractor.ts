/**
 * SEO Content Extractor
 * Extracts relevant text content from the DOM for SEO analysis
 */

export interface ExtractedContent {
  path: string;
  title: string;
  headings: string[];
  paragraphs: string[];
  links: string[];
  images: string[];
  fullText: string;
}

/**
 * Extracts SEO-relevant content from the current page
 * @param maxChars Maximum characters to include in fullText (default: 2000)
 * @returns ExtractedContent object with structured page content
 */
export function extractPageContent(maxChars: number = 2000): ExtractedContent {
  const path = window.location.pathname;
  
  // Extract title
  const titleElement = document.querySelector('title');
  const title = titleElement?.textContent?.trim() || '';
  
  // Extract headings (h1, h2, h3)
  const headingElements = document.querySelectorAll('h1, h2, h3');
  const headings = Array.from(headingElements)
    .map(el => el.textContent?.trim())
    .filter(Boolean) as string[];
  
  // Extract paragraphs from main content areas
  const mainContentSelectors = [
    'main p',
    'article p',
    '[role="main"] p',
    '.content p',
    'section p'
  ];
  
  const paragraphElements = document.querySelectorAll(mainContentSelectors.join(', '));
  const paragraphs = Array.from(paragraphElements)
    .map(el => el.textContent?.trim())
    .filter(text => text && text.length > 20) // Filter out very short paragraphs
    .slice(0, 10) as string[]; // Limit to first 10 paragraphs
  
  // Extract main links text
  const linkElements = document.querySelectorAll('main a, article a, [role="main"] a');
  const links = Array.from(linkElements)
    .map(el => el.textContent?.trim())
    .filter(Boolean)
    .slice(0, 15) as string[]; // Limit to first 15 links
  
  // Extract alt text from images
  const imageElements = document.querySelectorAll('main img, article img, [role="main"] img');
  const images = Array.from(imageElements)
    .map(img => (img as HTMLImageElement).alt?.trim())
    .filter(Boolean)
    .slice(0, 10) as string[]; // Limit to first 10 images
  
  // Build full text content
  const contentParts = [
    title,
    ...headings,
    ...paragraphs,
    ...links.slice(0, 5), // Only first 5 links to avoid noise
    ...images.slice(0, 3)  // Only first 3 image alts
  ];
  
  let fullText = contentParts.join(' ').trim();
  
  // Clean up the text
  fullText = fullText
    .replace(/\s+/g, ' ') // Normalize whitespace
    .replace(/[^\w\sáéíóúñÁÉÍÓÚÑ.,;:()\-]/g, '') // Keep only alphanumeric + punctuation
    .trim();
  
  // Limit to maxChars
  if (fullText.length > maxChars) {
    fullText = fullText.substring(0, maxChars) + '...';
  }
  
  return {
    path,
    title,
    headings,
    paragraphs: paragraphs.slice(0, 5), // Return only first 5 for structure
    links: links.slice(0, 10),
    images: images.slice(0, 5),
    fullText
  };
}

/**
 * Validates if the page has enough content for meaningful SEO analysis
 */
export function hasEnoughContent(content: ExtractedContent): boolean {
  return (
    content.fullText.length > 200 &&
    (content.headings.length > 0 || content.paragraphs.length > 0)
  );
}

/**
 * Gets a summary of the extracted content for logging/debugging
 */
export function getContentSummary(content: ExtractedContent): string {
  return `
Path: ${content.path}
Title: ${content.title}
Headings: ${content.headings.length}
Paragraphs: ${content.paragraphs.length}
Full text length: ${content.fullText.length} chars
  `.trim();
}
