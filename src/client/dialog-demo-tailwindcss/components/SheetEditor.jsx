import { useState, useEffect } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import FormInput from './FormInput';
import SheetButton from './SheetButton';

// This is a wrapper for google.script.run that lets us use promises.
import { serverFunctions } from '../../utils/serverFunctions';

const ScheduleTable = ({ schedules }) => (
  <>
    <table>
      <thead>
        <tr>
          <th>Time</th>
          <th>Slot</th>
          <th>Buyer</th>
          <th>Seller</th>
        </tr>
      </thead>
      <tbody>
        {schedules.map((schedule, _, __) => (
            <>
            <tr key={schedule.associatedTime + ' ' + schedule.slot}>
              <td>{schedule.associatedTime}</td>
              <td>{'SLOT ' + schedule.slot}</td>
              <td>{schedule.buyer.engName}</td>
              <td>{schedule.seller.engName}</td>
            </tr>
            </>
          )
        )}
      </tbody>
    </table>
  </>
);

const SheetEditor = () => {
  const name = 'John';
  const isNameShowing = true;

  const [slots, setSlots] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [schedules, setSchedules] = useState([]);

  const [chosenCompany, setChosenCompany] = useState('');
  const [chosenSlot, setChosenSlot] = useState(-1);

  useEffect(() => {
    async function initialTask() {
      try {
        setSlots(await serverFunctions.getAllSlots());
        setCompanies(await serverFunctions.getData());
        setSchedules(await serverFunctions.getAllSchedules());
      } catch (error) {
        console.log('something went wrong!! ' + error);
      }
    }

    initialTask();
  }, []);

  return (
    <div>
      <ScheduleTable schedules={schedules} />
    </div>
  );
};

export default SheetEditor;
