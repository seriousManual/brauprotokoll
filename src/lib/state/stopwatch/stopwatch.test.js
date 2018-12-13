import sinon from 'sinon';
import ms from 'ms';

import { delay } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';

import stopwatchReducer, {
  createStopwatchAddAction, createStopwatchStartAction,
  createStopwatchTickAction, createStopwatchRemoveAction, createStopwatchActivationAction,
  createStopwatchClearanceAction, createStopwatchPayloadAction,
  SW_STATE_ACTIVE, SW_STATE_DONE, SW_STATE_PENDING
} from './data';

import { sagaStopwatchStart, createSagaStopwatchStartAction } from './saga'
import { getSW } from '../../selector';

describe('stopwatch', () => {
  describe('saga', () => {
    it('should', () => {
      const generator = sagaStopwatchStart(createSagaStopwatchStartAction(123));

      const putStartAction = generator.next().value;
      const selectSW1 = generator.next().value;
      const putSWUpdate1 = generator.next({ state: SW_STATE_ACTIVE }).value;
      const delay1 = generator.next().value;

      const selectSW2 = generator.next().value;
      const genDone = generator.next({ state: SW_STATE_DONE }).done;

      expect(putStartAction).toEqual(put(createStopwatchStartAction(123)));
      expect(selectSW1).toEqual(select(getSW, 123));
      expect(putSWUpdate1).toEqual(put(createStopwatchTickAction(123)));
      expect(delay1).toEqual(call(delay, 1000));

      expect(selectSW2).toEqual(select(getSW, 123));
      expect(genDone).toEqual(true);
    });
  });

  describe('data', () => {
    describe('no action', () => {
      it('should', () => {
        const action = {};
        const state = undefined;

        const newState = stopwatchReducer(state, action);

        expect(newState).toEqual([]);
      });
    });

    describe('add stopwatch', () => {
      it('should create a stopwatch', () => {
        const ident = 'myIdent';
        const action = createStopwatchAddAction(ident, ms('3s'), { my: 'payload' });
        const state = undefined;

        const newState = stopwatchReducer(state, action);

        expect(newState).toEqual([{
          ident,
          activated: false,
          clearance: false,
          state: 'SW:PENDING',
          startTime: null,
          timeLeft: null,
          payload: { my: 'payload' },
          duration: 3000
        }]);
      });
    });

    describe('start stopwatch', () => {
      let clock = null;
      beforeAll(() => {
        clock = sinon.useFakeTimers();
      });

      afterAll(() => clock.restore());

      it('should start a stopwatch', () => {
        const ident = 'myident';
        const action = createStopwatchStartAction(ident);
        const state = [{
          ident,
          activated: false,
          clearance: false,
          state: SW_STATE_PENDING,
          startTime: null,
          timeLeft: null,
          payload: { my: 'payload' },
          duration: ms('3s')
        }];

        const newState = stopwatchReducer(state, action);

        expect(newState).toEqual([{
          ident,
          activated: false,
          clearance: false,
          state: SW_STATE_ACTIVE,
          duration: ms('3s'),
          startTime: '1970-01-01T00:00:00.000Z',
          payload: { my: 'payload' },
          timeLeft: null
        }]);
      });
    });

    describe('tick stopwatch', () => {
      let clock = null;
      beforeEach(() => {
        clock = sinon.useFakeTimers(ms('10s'));
      });

      afterEach(() => clock.restore());

      it('should update a stopwatch in between, no duration or payload', () => {
        const ident = 'myident';
        const action = createStopwatchTickAction(ident);
        const state = [{
          ident,
          state: SW_STATE_ACTIVE,
          startTime: '1970-01-01T00:00:00.000Z',
          timeLeft: null,
          payload: { my: 'payload' },
          duration: ms('10m')
        }];

        const newState = stopwatchReducer(state, action);

        expect(newState).toEqual([{
          ident,
          state: SW_STATE_ACTIVE,
          duration: ms('10m'),
          startTime: '1970-01-01T00:00:00.000Z',
          payload: { my: 'payload' },
          timeLeft: '9m 50s'
        }]);
      });

      it('should update a stopwatch in between, duration and payload', () => {
        const ident = 'myident';
        const action = createStopwatchTickAction(ident);
        const state = [{
          ident,
          state: SW_STATE_ACTIVE,
          startTime: '1970-01-01T00:00:00.000Z',
          timeLeft: null,
          payload: { my: 'payload' },
          duration: ms('10m')
        }];

        const newState = stopwatchReducer(state, action);

        expect(newState).toEqual([{
          ident,
          state: SW_STATE_ACTIVE,
          duration: ms('10m'),
          startTime: '1970-01-01T00:00:00.000Z',
          payload: { my: 'payload' },
          timeLeft: '9m 50s'
        }]);
      });

      it('should update a stopwatch thats done', () => {
        const ident = 'myident';
        const action = createStopwatchTickAction(ident);
        const state = [{
          ident,
          state: SW_STATE_ACTIVE,
          startTime: '1970-01-01T00:00:00.000Z',
          timeLeft: null,
          payload: { my: 'payload' },
          duration: ms('10s')
        }];

        const newState = stopwatchReducer(state, action);

        expect(newState).toEqual([{
          ident,
          state: SW_STATE_DONE,
          duration: ms('10s'),
          startTime: '1970-01-01T00:00:00.000Z',
          payload: { my: 'payload' },
          timeLeft: '0ms'
        }]);
      });
    });

    describe('activate action', () => {
      it('should activate a stopwatch', () => {
        const ident = 'myident';
        const action = createStopwatchActivationAction(ident, true);
        const state = [{
          ident,
          activated: false
        }];

        const newState = stopwatchReducer(state, action);

        expect(newState).toEqual([{
          ident,
          activated: true
        }]);
      });
    });

    describe('clearance action', () => {
      it('should clear a stopwatch', () => {
        const ident = 'myident';
        const action = createStopwatchClearanceAction(ident, true);
        const state = [{
          ident,
          clearance: false
        }];

        const newState = stopwatchReducer(state, action);

        expect(newState).toEqual([{
          ident,
          clearance: true
        }]);
      });
    });

    describe('payload action', () => {
      it('should merge the payload', () => {
        const ident = 'myident';
        const action = createStopwatchPayloadAction(ident, {foo: 'bar'});
        const state = [{
          ident,
          payload: {my: 'payload'}
        }];

        const newState = stopwatchReducer(state, action);

        expect(newState).toEqual([{
          ident,
          payload: {my: 'payload', foo: 'bar'}
        }]);
      });
    });

    describe('remove action', () => {
      it('should remove a stopwatch', () => {
        const action = createStopwatchRemoveAction('bar');
        const state = [{ident: 'foo'}, {ident: 'bar'}, {ident: 'bax'}];

        const newState = stopwatchReducer(state, action);

        expect(newState).toEqual([{ident: 'foo'}, {ident: 'bax'}]);
      });
    });
  });
});
