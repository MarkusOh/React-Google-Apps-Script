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

  
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    async function doSomething() {
      try {
        console.log('Lets see! Please! Lets go!');
        const hmmm = await serverFunctions.getData();
        const hmm2 = await serverFunctions.getAllAssociatedSchedulesForName('(주)에이치엔티');
        console.log('let me see about it ' + hmmm);
        console.log('let me see schedule! ' + hmm2);
        const hmm3 = await serverFunctions.getAllSchedulesForSlot(2);
        const hmm4 = await serverFunctions.getAllSlots();

        console.log('let me see scheduels for slot 2 ' + hmm3);
        console.log('slots are ');

        hmm4.forEach((num, _, __) => {
          console.log('slot ' + num);
        });

        hmm2.forEach((value, index, _) => {
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
