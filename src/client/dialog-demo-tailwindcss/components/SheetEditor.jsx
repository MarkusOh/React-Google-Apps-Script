import { useState, useEffect } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import FormInput from './FormInput';
import SheetButton from './SheetButton';

// This is a wrapper for google.script.run that lets us use promises.
import { serverFunctions } from '../../utils/serverFunctions';

const Checkbox = ({ checked, onChange }) => {
  return (
    <label>
      <input
        type="checkbox"
        checked={checked}
        onChange={({ target: { checked } }) => onChange(checked)}
      />
    </label>
  );
}

const ScheduleTable = ({ schedules, showKoreanName = false }) => (
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
        {schedules.map((schedule, _, __) => {
          const key = (schedule.associatedTime + schedule.slot).trim();
          
          return (
            <tr key={key}>
              <td>{schedule.associatedTime}</td>
              <td>{'SLOT ' + schedule.slot}</td>
              <td>{showKoreanName ? schedule.buyer.korName : schedule.buyer.engName}</td>
              <td>{showKoreanName ? schedule.seller.korName : schedule.seller.engName}</td>
            </tr>
          );
        })}
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
  const [showKoreanName, setShowKoreanName] = useState(false);

  const filteredSchedules = (slot, company) => {
    var filterable = schedules;

    if (slot !== -1) {
      filterable = filterable.filter((schedule) => {
        return schedule.slot === slot;
      });
    }

    if (company !== '') {
      filterable = filterable.filter((schedule) => {
        return schedule.buyer.engName === company || 
               schedule.buyer.korName === company ||
               schedule.seller.engName === company ||
               schedule.seller.korName === company;
      });
    }

    return filterable;
  }

  const companyName = (company) => {
    if (showKoreanName) {
      return company.korName;
    } else {
      return company.engName;
    }
  }

  useEffect(() => {
    async function initialTask() {
      try {
        const slotChoices = [-1].concat(await serverFunctions.getAllSlots());
        setSlots(slotChoices);

        const companyChoices = [{ engName: '<UNKNOWN_PLACEHOLDER>', korName: '<UNKNOWN_PLACEHOLDER>' }].concat(await serverFunctions.getData());
        setCompanies(companyChoices);

        setSchedules(await serverFunctions.getAllSchedules());
      } catch (error) {
        console.log('something went wrong!! ' + error);
      }
    }

    initialTask();
  }, []);

  return (
    <div>
      <div>
        <label>
          Display Korean names: 
          <Checkbox checked={showKoreanName} onChange={setShowKoreanName}></Checkbox>
        </label>
      </div>
      <div>
        {slots.length === 0 ? (
          <></>
        ) : (
          <>
          <label>
            Pick Slot Number: 
            <select id='slotSelectionMenu' onChange={(_) => {
              const selected = Number(document.getElementById('slotSelectionMenu').value);
              setChosenSlot(selected);
            }}>
              {slots.map((slotNum, _, __) => (
                slotNum === -1 ? 
                <option value={slotNum} key='UNKNOWN_SLOT'>{`Show All Schedules`}</option> :
                <option value={slotNum} key={slotNum}>{`Slot ${slotNum}`}</option>
              ))}
            </select>
          </label>
          </>
        )}
      </div>
      <div>
        {companies.length === 0 ? (
          <></>
        ) : (
          <>
          <label>
            Pick Company: 
            <select id='companySelectionMenu' onChange={(_) => {
              const selected = document.getElementById('companySelectionMenu').value;
              setChosenCompany(selected);
            }}>
              {companies.map((company, _, __) => (
                company.engName === '<UNKNOWN_PLACEHOLDER>' ? 
                <option value=''key='UNKNOWN'>{`Show All Companies`}</option> :
                <option value={companyName(company)} key={companyName(company)}>{`${companyName(company)}`}</option>
              ))}
            </select>
          </label>
          </>
        )}
      </div>
      <ScheduleTable schedules={
        filteredSchedules(chosenSlot, chosenCompany)
      } showKoreanName={showKoreanName} />
    </div>
  );
};

export default SheetEditor;
