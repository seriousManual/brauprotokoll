import sinon from 'sinon';

import pitReducer, {
  createPitAddAction, createPitSetAction, 
  createPitActivationAction, createPitClearanceAction,
  createPitPayloadAction, createPitRemoveAction
} from './data';

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
        const ident = 'myIdent';
        const action = createPitAddAction(ident, { my: 'payload' });
        const state = undefined;

        const newState = pitReducer(state, action);

        expect(newState).toEqual([{
          ident,
          payload: { my: 'payload' },
          activated: false,
          clearance: false,
          pointInTime: null
        }]);
      });

      it('should create a pit which is already activated', () => {
        const ident = 'myIdent';
        const action = createPitAddAction(ident, { my: 'payload' }, true);
        const state = undefined;

        const newState = pitReducer(state, action);

        expect(newState).toEqual([{
          ident,
          payload: { my: 'payload' },
          activated: true,
          clearance: false,
          pointInTime: null
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
        const ident = 'myIdent';
        const entry1 = {
          ident,
          payload: {my: 'payload'},
          activated: false,
          clearance: false,
          pointInTime: null
        };

        const entry2 = {
          ident: 'myIdent2',
          payload: {my: 'payload2'},
          activated: false,
          clearance: false,
          pointInTime: null
        };

        const action = createPitSetAction(ident);
        const state = [entry1, entry2];

        const newState = pitReducer(state, action);

        expect(newState).toEqual([
          {...entry1, pointInTime: '1970-01-01T00:00:00.000Z'}, 
          entry2
        ]);
      });
    });

    describe('activate pit', () => {
      let clock = null;
      beforeAll(() => {
        clock = sinon.useFakeTimers();
      });

      afterAll(() => clock.restore());

      it('should set a pit', () => {
        const ident = 'myIdent';
        const entry1 = {
          ident,
          payload: {my: 'payload'},
          activated: false,
          clearance: false,
          pointInTime: null
        };

        const entry2 = {
          ident: 'myIdent2',
          payload: {my: 'payload2'},
          activated: false,
          clearance: false,
          pointInTime: null
        };

        const action = createPitActivationAction(ident, true);
        const state = [entry1, entry2];

        const newState = pitReducer(state, action);

        expect(newState).toEqual([{...entry1, activated: true}, entry2]);
      });
    });

    describe('pit clearance', () => {
      let clock = null;
      beforeAll(() => {
        clock = sinon.useFakeTimers();
      });

      afterAll(() => clock.restore());

      it('should set a pit', () => {
        const ident = 'myIdent';
        const entry1 = {
          ident,
          payload: {my: 'payload'},
          activated: false,
          clearance: false,
          pointInTime: null
        };

        const entry2 = {
          ident: 'myIdent2',
          payload: {my: 'payload2'},
          activated: false,
          clearance: false,
          pointInTime: null
        };

        const action = createPitClearanceAction(ident, true);
        const state = [entry1, entry2];

        const newState = pitReducer(state, action);

        expect(newState).toEqual([{...entry1, clearance: true}, entry2]);
      });
    });

    describe('pit payload update', () => {
      it('should set a pit', () => {
        const ident = 'myIdent';
        const entry1 = {
          ident,
          payload: {my: 'payload'},
          activated: false,
          clearance: false,
          pointInTime: null
        };

        const action = createPitPayloadAction(ident, {foo: 'bar'});
        const state = [entry1];

        const newState = pitReducer(state, action);

        expect(newState).toEqual([{...entry1, payload: {foo: 'bar', my: 'payload'}}]);
      });
    });

    describe('pit remove', () => {
      it('should remove a pit', () => {
        const action = createPitRemoveAction('b');
        const state = [{ident: 'a'}, {ident: 'b'}, {ident: 'c'}];

        const newState = pitReducer(state, action);

        expect(newState).toEqual([{ident: 'a'}, {ident: 'c'}]);
      });
    });
  });
});