import sinon from 'sinon';
import ms from 'ms';

import stopwatchReducer, {
  createStopwatchAddAction, createStopwatchStartAction, createStopwatchUpdateAction,
  SW_STATE_ACTIVE, SW_STATE_DONE, SW_STATE_PENDING
} from './data';

const regexpUUID = /[a-f0-9]+\-[a-f0-9]+\-[a-f0-9]+\-[a-f0-9]+\-[a-f0-9]+/;

describe('stopwatch', () => {
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
      const action = createStopwatchAddAction(ms('3s'), {my: 'payload'});
      const state = undefined;
  
      const newState = stopwatchReducer(state, action);
  
      expect(newState).toEqual([{
        id: expect.stringMatching(regexpUUID),
        state: 'SW:PENDING',
        startTime: null,
        timeLeft: null,
        payload: {my: 'payload'},
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
      const id = 'myId';
      const action = createStopwatchStartAction(id);
      const state = [{
        id,
        state: SW_STATE_PENDING,
        startTime: null,
        timeLeft: null,
        payload: {my: 'payload'},
        duration: ms('3s')
      }];
  
      const newState = stopwatchReducer(state, action);

      expect(newState).toEqual([{
        id,
        state: SW_STATE_ACTIVE,
        duration: ms('3s'),
        startTime: '1970-01-01T00:00:00.000Z',
        payload: {my: 'payload'},
        timeLeft: null
      }]);
    });
  });

  describe('update stopwatch', () => {
    let clock = null;
    beforeEach(() => {
      clock = sinon.useFakeTimers(ms('10s'));
    });

    afterEach(() => clock.restore());

    it('should update a stopwatch in between, no duration or payload', () => {
      const id = 'myId';
      const action = createStopwatchUpdateAction(id);
      const state = [{
        id,
        state: SW_STATE_ACTIVE,
        startTime: '1970-01-01T00:00:00.000Z',
        timeLeft: null,
        payload: {my: 'payload'},
        duration: ms('10m')
      }];
  
      const newState = stopwatchReducer(state, action);

      expect(newState).toEqual([{
        id,
        state: SW_STATE_ACTIVE,
        duration: ms('10m'),
        startTime: '1970-01-01T00:00:00.000Z',
        payload: {my: 'payload'},
        timeLeft: '9m 50s'
      }]);
    });

    it('should update a stopwatch in between, duration and payload', () => {
      const id = 'myId';
      const action = createStopwatchUpdateAction(id, ms('11m'), {more: 'payload'});
      const state = [{
        id,
        state: SW_STATE_ACTIVE,
        startTime: '1970-01-01T00:00:00.000Z',
        timeLeft: null,
        payload: {my: 'payload'},
        duration: ms('10m')
      }];
  
      const newState = stopwatchReducer(state, action);

      expect(newState).toEqual([{
        id,
        state: SW_STATE_ACTIVE,
        duration: ms('11m'),
        startTime: '1970-01-01T00:00:00.000Z',
        payload: {more: 'payload'},
        timeLeft: '10m 50s'
      }]);
    });

    it('should update a stopwatch thats done', () => {
      const id = 'myId';
      const action = createStopwatchUpdateAction(id);
      const state = [{
        id,
        state: SW_STATE_ACTIVE,
        startTime: '1970-01-01T00:00:00.000Z',
        timeLeft: null,
        payload: {my: 'payload'},
        duration: ms('10s')
      }];
  
      const newState = stopwatchReducer(state, action);

      expect(newState).toEqual([{
        id,
        state: SW_STATE_DONE,
        duration: ms('10s'),
        startTime: '1970-01-01T00:00:00.000Z',
        payload: {my: 'payload'},
        timeLeft: '0ms'
      }]);
    });
  });
});