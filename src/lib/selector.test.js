import {
  getAppMode, getPit, getPitPrefixed, getSW
}
from './selector';

const state = {
  app: {
    mode: 'foo'
  },

  pits: [
    {ident: 'foo'}, 
    {ident: 'bar'}, 
    {ident: 'spam:eggs'},
    {ident: 'spam:butter'} 
  ]
};

describe('selector', () => {
  it('should get the appmode', () => {
    const result = getAppMode(state);

    expect(result).toEqual(state.app.mode)
  });

  it('should get a pit', () => {
    const ident = 'foo';

    const result = getPit(state, ident);

    expect(result).toBe(state.pits[0]);
  });

  it('should get a prefixed pit', () => {
    const ident = 'spam';

    const result = getPitPrefixed(state, ident);

    expect(result).toEqual([state.pits[2], state.pits[3]]);
  });
});