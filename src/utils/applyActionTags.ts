import type { Highlight } from '~/models';

export const applyActionTags = (highlight: Highlight): Highlight => {
  if (highlight.note) {
    switch (highlight.note) {
      case '.h1':
        highlight.text = `# ${highlight.text}`;
        highlight.note = null;
        highlight.isHeading = true;
        break;
      case '.h2':
        highlight.text = `## ${highlight.text}`;
        highlight.note = null;
        highlight.isHeading = true;
        break;
      case '.h3':
        highlight.text = `### ${highlight.text}`;
        highlight.note = null;
        highlight.isHeading = true;
        break;
      case '.h4':
        highlight.text = `#### ${highlight.text}`;
        highlight.note = null;
        highlight.isHeading = true;
        break;
      case '.h5':
        highlight.text = `##### ${highlight.text}`;
        highlight.note = null;
        highlight.isHeading = true;
        break;
      case '.h6':
        highlight.text = `###### ${highlight.text}`;
        highlight.note = null;
        highlight.isHeading = true;
        break;
      default:
        highlight.isHeading = false;
    }
  }

  return highlight;
};
