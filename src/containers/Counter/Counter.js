import React, { useState } from "react";
import { connect } from "react-redux";
import CounterControl from "../../components/CounterControl/CounterControl";
import CounterOutput from "../../components/CounterOutput/CounterOutput";
import * as actionTypes from '../../store/actions'
const Counter = (props) => {
  const [counterValue, setCounterValue] = useState(0);
  const counterChangedHandler = (action, value) => {
    switch (action) {
      case "inc":
        setCounterValue((prev) => prev + 1);
        break;
      case "dec":
        setCounterValue((prev) => prev - 1);
        break;
      case "add":
        setCounterValue((prev) => prev + 5);
        break;
      case "sub":
        setCounterValue((prev) => prev - 5);
        break;
    }
  };

  return (
    <div>
      <CounterOutput value={props.ctr} />
      <CounterControl
        label="Increment"
        clicked={() => props.onIncrementCounter()}
      />
      <CounterControl
        label="Decrement"
        clicked={() => props.onDecrementCounter()}
      />
      <CounterControl label="Add 10" clicked={() => props.onAddCounter()} />
      <CounterControl
        label="Subtract 15"
        clicked={() => props.onSubtractCounter()}
      />
      <hr />
      <button onClick={() => props.onStoreResult()}>Store Result</button>
      <ul>
        {props.storedResults.map((strResult) => {
          return (
            <li
              key={strResult.id}
              onClick={() => props.onDeleteResult(strResult.id)}
            >
              {strResult.value}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    ctr: state.counter,
    storedResults: state.results,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIncrementCounter: () => dispatch({ type: actionTypes.INCREMENT }),
    onDecrementCounter: () => dispatch({ type: actionTypes.DECREMENT }),
    onAddCounter: () => dispatch({ type: actionTypes.ADD, val: 10 }),
    onSubtractCounter: () => dispatch({ type: actionTypes.SUBTRACT, val: 15 }),
    onStoreResult: () => dispatch({ type: actionTypes.STORE_RESULT }),
    onDeleteResult: (id) => dispatch({ type: actionTypes.DELETE_RESULT, resultElId: id }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
