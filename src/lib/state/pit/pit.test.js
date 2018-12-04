import sinon from 'sinon';

import pitReducer, {createPitAddAction, createPitSetAction} from './data';

const regexpUUID = /[a-f0-9]+\-[a-f0-9]+\-[a-f0-9]+\-[a-f0-9]+\-[a-f0-9]+/;

describe('pit', () => {
  describe('data', () => {
    describe('no action', () => {
      it('should', () => {
        const action = {};
        const state = undefined;

        const newState = pitReducer(state, action);

        expect(newState).toEqual([]);
      });
    });

    describe('add pit', () => {
      it('should create a pit', () => {
        const action = createPitAddAction({ my: 'payload' });
        const state = undefined;

        const newState = pitReducer(state, action);

        expect(newState).toEqual([{
          id: expect.stringMatching(regexpUUID),
          pointInTime: null,
          payload: { my: 'payload' }
        }]);
      });
    });

    describe('set pit', () => {
      let clock = null;
      beforeAll(() => {
        clock = sinon.useFakeTimers();
      });

      afterAll(() => clock.restore());

      it('should set a pit', () => {
        const id = 'myId';
        const action = createPitSetAction(id);
        const state = [{
          id,
          pointInTime: null,
          payload: { my: 'payload' }
        }];

        const newState = pitReducer(state, action);

        expect(newState).toEqual([{
          id,
          pointInTime: null,
          payload: { my: 'payload' },
          pointInTime: '1970-01-01T00:00:00.000Z'
        }]);
      });
    });
  });
});
