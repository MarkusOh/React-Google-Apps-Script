import { useState, useEffect } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import FormInput from './FormInput';
import SheetButton from './SheetButton';

// This is a wrapper for google.script.run that lets us use promises.
import { serverFunctions } from '../../utils/serverFunctions';

const Person = (props) => {
  return (
    <>
    <h1>Something here!</h1>
    <h2>Name is {props.name}</h2>
    </>
  );
}

const SheetEditor = () => {
  const name = 'John';
  const isNameShowing = true;

  const [counter, setCounter] = useState(0);
  const [origin, setOrigin] = useState(0);

  useEffect(() => {
    async function doSomething() {
      try {
        console.log('Lets see! Please! Lets go!');
        const hmmm = await serverFunctions.getData();
        console.log('let me see about it ' + hmmm);
        hmmm.forEach((value, index, _) => {
          console.log(index + 'entry is ' + value.engName);
        });
      } catch (error) {
        console.log('something went wrong!! ' + error);
      }
    }

    doSomething();
  }, []);

  return (
    <div>
      <button onClick={() => setOrigin((prevCounter) => prevCounter - 1)}>-</button>
      <button onClick={() => setOrigin((prevCounter) => prevCounter + 1)}>+</button>
      <h1>Hello {isNameShowing ? name : 'No name'} {name}</h1>
      <h2>{counter}</h2>
      <Person name={'John'}/>
      <Person />
      <Person />
      <Person />
      {isNameShowing ? (
        <>test</>
      ) : (
        <>
        <h1>test</h1>
        <h2>no name,,,</h2>
        </>
      )}
    </div>
  );
};

export default SheetEditor;
