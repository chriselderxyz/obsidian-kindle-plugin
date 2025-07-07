import _ from 'lodash';

import type { Highlight } from '~/models';

import type { DiffResult, RenderedHighlight } from './';

type DiffIndex = {
  highlight: Highlight;
  exists: boolean;
};

const getNextNeighbour = (state: Map<string, DiffIndex>, needle: string): Highlight => {
  const keys = Array.from(state.keys());
  const needleIndex = keys.indexOf(needle);

  let next: Highlight = null;

  for (let i = needleIndex + 1; i < keys.length; i++) {
    const diffIndex = state.get(keys[i]);
    if (diffIndex.exists) {
      next = diffIndex.highlight;
      break;
    }
  }

  return next;
};

export const diffLists = (
  remotes: Highlight[],
  renders: RenderedHighlight[]
): DiffResult[] => {
  /**
   * Array of remote highlights that have not been rendered
   */
  const diff = _.differenceWith(remotes, renders, (a, b) => a.id === b.highlightId);

  /**
   * Map every remote highlight id to where it exists (in render)
   * Use an ES6 Map to ensure key orders are preserved
   */
  const syncState = new Map<string, DiffIndex>();
  remotes.forEach((r) => syncState.set(r.id, { highlight: r, exists: !diff.contains(r) }));

  return diff.map((remote): DiffResult => {
    // Get the next full highlight that is already rendered (exists)
    // Need this to see if it is renered as a heading or not as it affects the insert line
    const next = getNextNeighbour(syncState, remote.id);
    const nextRendered = renders.find((r) => r.highlightId === next?.id);

    return {
      remoteHighlight: remote,
      nextHighlight: next,
      nextRenderedHighlight: nextRendered
    };
  });
};
