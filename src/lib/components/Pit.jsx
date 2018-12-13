import React from 'react';
import { connect } from 'react-redux';

import { getPit, getAppMode } from '../selector';

import {
  createPitSetAction, createPitActivationAction, 
  createPitPayloadAction, createPitRemoveAction
} from '../state/pit/data';
import { APP_MODE_BREW, APP_MODE_EDIT } from '../state/app/data';

function Pit(props) {
  const { appMode, activated, clearance, pointInTime, onActivate, onSet, onRemove, deletable } = props;

  if (appMode === APP_MODE_BREW && !activated) {
    return null;
  }

  return <div>
    {appMode === APP_MODE_EDIT && !deletable ?
      <input type="checkbox" checked={activated} onChange={() => onActivate(!activated)} /> :
      null}

    {props.children(props)}

    {appMode === APP_MODE_BREW && pointInTime || null}

    {appMode === APP_MODE_BREW && !pointInTime ? 
      <button disabled={!clearance} onClick={onSet}>set</button> : 
      null}

    {appMode === APP_MODE_EDIT && deletable ?
      <span onClick={() => onRemove()}>X</span> :
      null}
  </div>;
}

function connectPit(Component) {
  return connect(
    (state, ownProps) => {
      const pit = getPit(state, ownProps.ident) || {};
      const appMode = getAppMode(state);

      return { ...pit, appMode };
    },
    (dispatch, ownProps) => ({
      onSet: () => dispatch(createPitSetAction(ownProps.ident)),
      onActivate: flag => dispatch(createPitActivationAction(ownProps.ident, flag)),
      onPayload: payload => dispatch(createPitPayloadAction(ownProps.ident, payload)),
      onRemove: () => dispatch(createPitRemoveAction(ownProps.ident))
    })
  )(Component);
}

export const MashPit = connectPit(function (props) {
  return <Pit {...props}>
    {
      (props) => {
        let content = <React.Fragment>{props.payload.temp}°C</React.Fragment>

        if (props.appMode === APP_MODE_EDIT) {
          content = <React.Fragment>
            <input type="text" defaultValue={props.payload.temp} onChange={(e) => props.onPayload({ temp: e.target.value })} />°C
          </React.Fragment>;
        }

        return <span>
          <span onClick={() => props.onActivate(!props.activated)}>{props.title}:</span> {content}
        </span>;
      }
    }
  </Pit>;
});

export const MashInPit = () => <MashPit ident="mashIn" title="Mash In" />
export const MashOutPit = () => <MashPit ident="mashOut" title="Mash Out" />

export const CookingPit = connectPit(function (props) {
  return <Pit {...props} deletable={true}>
    {
      (props) => {
        if (props.appMode === APP_MODE_BREW) {
          return <span>{props.payload.amount}g of {props.payload.hops}</span>;
        }

        return <span>
          <input type="text" defaultValue={props.payload.amount} 
              onChange={(e) => props.onPayload({ amount: e.target.value })} />g of
          <input type="text" defaultValue={props.payload.hops}
              placeholder="enter Hop Type"
              onChange={(e) => props.onPayload({ hops: e.target.value })} />
        </span>;
      }
    }
  </Pit>;
});