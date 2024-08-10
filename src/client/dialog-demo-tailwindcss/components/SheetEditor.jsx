import { useState, useEffect } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import FormInput from './FormInput';
import SheetButton from './SheetButton';

// This is a wrapper for google.script.run that lets us use promises.
import { serverFunctions } from '../../utils/serverFunctions';

const Checkbox = ({ checked, onChange }) => {
  return (
    <label className="inline-flex items-center">
      <input
        type="checkbox"
        checked={checked}
        onChange={({ target: { checked } }) => onChange(checked)}
        className="form-checkbox h-5 w-5 text-indigo-600"
      />
    </label>
  );
};

const ScheduleTable = ({ chosenCompany = '', schedules, showKoreanNameForBuyer = false, showKoreanNameForSeller = false }) => (
  <div id="selectableTable">
    {
      chosenCompany ? 
      <div className="text-2xl font-bold my-3">
        Schedule for {chosenCompany}
      </div>
      : <></>
    }
    <table className="min-w-full table-auto text-left border-collapse">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-6 py-3 text-center">Time (in KST)</th>
          <th className="px-6 py-3 text-center">Slot</th>
          <th className="px-6 py-3 text-center">Buyer</th>
          <th className="px-6 py-3 text-center">Seller</th>
        </tr>
      </thead>
      <tbody>
        {schedules.map((schedule, _, __) => {
          const key = (schedule.associatedTime + schedule.slot).trim();

          return (
            <tr key={key} className="border-b border-gray-200">
              <td className="px-6 py-2 text-center">{schedule.associatedTime}</td>
              <td className="px-6 py-2 text-center">{'SLOT ' + schedule.slot}</td>
              <td className="px-6 py-2 text-center">
                {showKoreanNameForBuyer ? schedule.buyer.korName : schedule.buyer.engName}
              </td>
              <td className="px-6 py-2 text-center">
                {showKoreanNameForSeller ? schedule.seller.korName : schedule.seller.engName}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

const SheetEditor = () => {
  const name = 'John';
  const isNameShowing = true;

  const [slots, setSlots] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [schedules, setSchedules] = useState([]);

  const [chosenCompany, setChosenCompany] = useState('');
  const [chosenSlot, setChosenSlot] = useState(-1);
  const [showKoreanNameForBuyer, setShowKoreanNameForBuyer] = useState(false);
  const [showKoreanNameForSeller, setShowKoreanNameForSeller] = useState(false);

  const filteredSchedules = (slot, company) => {
    let filterable = schedules;

    if (slot !== -1) {
      filterable = filterable.filter((schedule) => schedule.slot === slot);
    }

    if (company !== '') {
      filterable = filterable.filter(
        (schedule) =>
          schedule.buyer.engName === company ||
          schedule.buyer.korName === company ||
          schedule.seller.engName === company ||
          schedule.seller.korName === company
      );
    }

    return filterable;
  };

  const companyName = (company) => {
    if (company.isSeller) {
      return showKoreanNameForSeller ? company.korName : company.engName;
    } else {
      return showKoreanNameForBuyer ? company.korName : company.engName;
    }
  };

  useEffect(() => {
    async function initialTask() {
      try {
        const slotChoices = [-1].concat(await serverFunctions.getAllSlots());
        setSlots(slotChoices);

        const companyChoices = [{ engName: '<UNKNOWN_PLACEHOLDER>', korName: '<UNKNOWN_PLACEHOLDER>' }].concat(
          await serverFunctions.getData()
        );
        setCompanies(companyChoices);

        setSchedules(await serverFunctions.getAllSchedules());
      } catch (error) {
        console.log('something went wrong!! ' + error);
      }
    }

    initialTask();
  }, []);

  return (
    <div className="p-6 bg-white space-y-4">
      <div>
        <label className="text-gray-700 font-medium">
          Display Korean names for Buyers:
          <Checkbox checked={showKoreanNameForBuyer} onChange={(choice) => setShowKoreanNameForBuyer(choice)} />
        </label>
      </div>
      <div>
        <label className="text-gray-700 font-medium">
          Display Korean names for Sellers:
          <Checkbox checked={showKoreanNameForSeller} onChange={setShowKoreanNameForSeller} />
        </label>
      </div>
      <div>
        {slots.length === 0 ? null : (
          <>
            <label className="text-gray-700 font-medium">
              Pick Slot Number:
              <select
                id="slotSelectionMenu"
                onChange={() => {
                  const selected = Number(document.getElementById('slotSelectionMenu').value);
                  setChosenSlot(selected);
                }}
                className="ml-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {slots.map((slotNum, _, __) => (
                  slotNum === -1 ? 
                  <option value={slotNum} key="UNKNOWN_SLOT">{`Show All Schedules`}</option> :
                  <option value={slotNum} key={slotNum}>{`Slot ${slotNum}`}</option>
                ))}
              </select>
            </label>
          </>
        )}
      </div>
      <div>
        {companies.length === 0 ? null : (
          <>
            <label className="text-gray-700 font-medium">
              Pick Company:
              <select
                id="companySelectionMenu"
                onChange={() => {
                  const selected = document.getElementById('companySelectionMenu').value;
                  setChosenCompany(selected);
                }}
                className="ml-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {companies.map((company, _, __) => (
                  company.engName === '<UNKNOWN_PLACEHOLDER>' ? 
                  <option value="" key="UNKNOWN">{`Show All Companies`}</option> :
                  <option value={companyName(company)} key={company.engName}>{`${companyName(company)}`}</option>
                ))}
              </select>
            </label>
          </>
        )}
      </div>
      {filteredSchedules(chosenSlot, chosenCompany).length === 0 ? (
        <div className="flex justify-center items-center my-6">
          <div className="w-8 h-8 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
        </div>
        ) : (
        <div>
          <ScheduleTable
            chosenCompany={chosenCompany}
            schedules={filteredSchedules(chosenSlot, chosenCompany)}
            showKoreanNameForBuyer={showKoreanNameForBuyer}
            showKoreanNameForSeller={showKoreanNameForSeller}
          />
          <button
            type="button"
            onClick={() => {
              const table = document.getElementById('selectableTable');
              const range = document.createRange();
              const selection = window.getSelection();
              range.selectNodeContents(table);
              selection.removeAllRanges();
              selection.addRange(range);
            }}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {`Select Table`}
          </button>
        </div>
      )}
    </div>
  );
};

export default SheetEditor;
