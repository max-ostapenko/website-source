import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';

export interface NotebookCellOutput {
  type: 'stream' | 'html' | 'image' | 'text';
  content: string;
}

export interface ParsedNotebookCell {
  id: string;
  type: 'code' | 'markdown';
  source: string;
  htmlContent?: string;
  outputs?: NotebookCellOutput[];
}

export function parseNotebook(filePath: string, targetCellId?: string): ParsedNotebookCell[] {
  try {
    let resolvedPath = filePath;
    if (!path.isAbsolute(filePath)) {
      resolvedPath = path.resolve(process.cwd(), filePath);
    }

    if (!fs.existsSync(resolvedPath)) {
      console.warn(`Notebook file not found at: ${resolvedPath}`);
      return [];
    }

    const raw = fs.readFileSync(resolvedPath, 'utf-8');
    const data = JSON.parse(raw);
    if (!data.cells || !Array.isArray(data.cells)) return [];

    const cells: ParsedNotebookCell[] = [];

    for (const cell of data.cells) {
      const cellId = cell.id || (cell.metadata?.tags && cell.metadata.tags[0]) || '';
      
      // If a targetCellId is specified, only include matching cell
      if (targetCellId && cellId !== targetCellId && (!cell.metadata?.tags || !cell.metadata.tags.includes(targetCellId))) {
        continue;
      }

      const sourceLines = Array.isArray(cell.source) ? cell.source.join('') : (cell.source || '');

      if (cell.cell_type === 'markdown') {
        const html = marked.parse(sourceLines) as string;
        cells.push({
          id: cellId,
          type: 'markdown',
          source: sourceLines,
          htmlContent: html,
        });
      } else if (cell.cell_type === 'code') {
        const outputs: NotebookCellOutput[] = [];

        if (cell.outputs && Array.isArray(cell.outputs)) {
          for (const out of cell.outputs) {
            if (out.output_type === 'stream') {
              const text = Array.isArray(out.text) ? out.text.join('') : (out.text || '');
              if (text.trim()) {
                outputs.push({ type: 'stream', content: text });
              }
            } else if (out.output_type === 'display_data' || out.output_type === 'execute_result') {
              if (out.data?.['text/html']) {
                const html = Array.isArray(out.data['text/html'])
                  ? out.data['text/html'].join('')
                  : out.data['text/html'];
                outputs.push({ type: 'html', content: html });
              } else if (out.data?.['image/png']) {
                const b64 = Array.isArray(out.data['image/png'])
                  ? out.data['image/png'].join('')
                  : out.data['image/png'];
                outputs.push({
                  type: 'image',
                  content: `<img src="data:image/png;base64,${b64}" alt="Notebook Chart Output" style="max-width:100%; border-radius: 8px; margin: 0.5rem 0;" />`,
                });
              } else if (out.data?.['text/plain']) {
                const text = Array.isArray(out.data['text/plain'])
                  ? out.data['text/plain'].join('')
                  : out.data['text/plain'];
                // Ignore generic widget model IDs
                if (!text.includes('application/vnd.jupyter.widget-view')) {
                  outputs.push({ type: 'text', content: text });
                }
              }
            }
          }
        }

        cells.push({
          id: cellId,
          type: 'code',
          source: sourceLines,
          outputs,
        });
      }
    }

    return cells;
  } catch (err) {
    console.error(`Error parsing notebook at ${filePath}:`, err);
    return [];
  }
}
