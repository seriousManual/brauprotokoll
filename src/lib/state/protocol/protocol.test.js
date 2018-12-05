import sinon from 'sinon';

import pitReducer, {createPitAddAction, createPitSetAction} from './data';

describe('protocol', () => {
  describe('data', () => {
    describe('no action', () => {
      it('should', () => {
        const action = {};
        const state = undefined;

        const newState = pitReducer(state, action);

        expect(newState).toEqual({rests: []});
      });
    });

    describe('add pit', () => {
      it('should create a pit', () => {
        const action = createPitAddAction('fooIdent', { my: 'payload' });
        const state = undefined;

        const newState = pitReducer(state, action);

        expect(newState).toEqual({
          rests: [],
          fooIdent: {
            payload: {my: 'payload'},
            pointInTime: null
          }
        });
      });
    });

    describe('set pit', () => {
      let clock = null;
      beforeAll(() => {
        clock = sinon.useFakeTimers();
      });

      afterAll(() => clock.restore());

      it('should set a pit', () => {
        const ident = 'fooId';
        const action = createPitSetAction(ident);
        const state = {
          rests: [],
          fooId: {
            pointInTime: null,
            payload: {my: 'payload'}
          },
          barId: {
            pointInTime: '1971-01-01T00:00:00.000Z',
            payload: {my: 'payload'}
          }
        };

        const newState = pitReducer(state, action);

        expect(newState).toEqual({
          rests: [],
          fooId: {
            pointInTime: '1970-01-01T00:00:00.000Z',
            payload: {my: 'payload'}
          },
          barId: {
            pointInTime: '1971-01-01T00:00:00.000Z',
            payload: {my: 'payload'}
          }
        });
      });
    });
  });
});
