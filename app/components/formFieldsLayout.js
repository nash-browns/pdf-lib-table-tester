'use client';

import { useState } from 'react';
import { StandardField, MultiSelect } from "./";
import { fieldDefs } from '../lib/formDefs';

export function FormFieldsLayout({ userPdfSettings, setUserPdfSettings, examples, onExampleChange, columns }) {
  const [openSections, setopenSection] = useState(false);

  const handleAccordionClick = (e, section) => {
    setopenSection((prevState) => {
      if(prevState === section) return false;
      return section;
    });
  };

  return (
        <>
            <form className="collapse collapse-arrow bg-base-300 mb-2">
                <input 
                    type="radio"
                    onClick={(e) => handleAccordionClick(e, 'Examples')} 
                    onChange={() => ''}
                    name="my-accordion-2" 
                    className="w-full"
                    checked={openSections === 'Examples' ? true : false}
                /> 
                <div className="collapse-title text-xl font-medium text-primary">
                    Examples
                </div>
                <div className="collapse-content text-gray-500"> 
                    <Examples
                        examples={examples}
                        onExampleChange={onExampleChange}
                    />
                </div>
            </form>
            {
                Object.keys(userPdfSettings).map((section) => {
                    return (
                        <form key={section} className="collapse collapse-arrow bg-base-300 mb-2">
                            <input 
                                type="radio"
                                // ref={e => accodianRef.current[section] = {element: e, open: false} } 
                                onClick={(e) => handleAccordionClick(e, section)} 
                                onChange={() => ''}
                                name="my-accordion-2" 
                                className="w-full"
                                checked={openSections === section ? true : false}
                            /> 
                            <div className="collapse-title text-xl font-medium text-primary">
                                {section}
                            </div>
                            <div className="collapse-content text-gray-500"> 
                                {
                                    section === 'Columns' ?
                                    <ColumnOptions
                                        columns={columns ?? []}
                                        userPdfSettings={userPdfSettings}
                                        setUserPdfSettings={setUserPdfSettings}
                                    />
                                    :
                                    <FormInputs 
                                        userPdfSettings={userPdfSettings}
                                        setUserPdfSettings={setUserPdfSettings}
                                        section={section}
                                    />
                                }
                            </div>
                        </form>
                    )
                })
            }
        </>
    )
};


export function FormInputs({userPdfSettings, setUserPdfSettings, section}) {
  return (
    <>
      {
        userPdfSettings[section] && Object.keys(userPdfSettings[section]).map((key) => fieldDefs[key] && (
          <div key={key} className="relative mt-3">
            {
              fieldDefs[key].options ? 
              <MultiSelect
                field={key}
                fieldDef={fieldDefs[key]}
                userPdfSettings ={userPdfSettings}
                setUserPdfSettings ={setUserPdfSettings}
                section={section}
              />
              :
              <StandardField
                field={key}
                fieldDef={fieldDefs[key]}
                userPdfSettings ={userPdfSettings}
                setUserPdfSettings ={setUserPdfSettings}
                section={section}
              />
            }
          </div>
        ))
      }
    </>
  )
};

//three mode selects - columnWidth / columnAlignment / wrapText. flipping one
//to Manual reveals a field per column of the current example beneath it.
//state: userPdfSettings.Columns = { columnWidth, columnAlignment, wrapText, values: { [columnId]: {...} } }
const MODE_DEF = {options: [{ id: 1, name: 'Auto', value: 'auto' }, { id: 2, name: 'Manual', value: 'manual' }], defaultOption: 0};
const WRAP_MODE_DEF = {options: [{ id: 1, name: 'True', value: true }, { id: 2, name: 'Manual', value: 'manual' }], defaultOption: 0};
const ALIGN_DEF = {options: [{ id: 1, name: 'Left', value: 'left' }, { id: 2, name: 'Center', value: 'center' }, { id: 3, name: 'Right', value: 'right' }], defaultOption: 0};
const WRAP_DEF = {options: [{ id: 1, name: 'True', value: true }, { id: 2, name: 'False (truncate with ellipsis)', value: false }], defaultOption: 0};

function ColumnOptions({ columns, userPdfSettings, setUserPdfSettings }) {
  const state = userPdfSettings.Columns ?? {};
  const values = state.values ?? {};

  const setMode = (option, value) => {
    setUserPdfSettings((prevState) => ({
      ...prevState,
      Columns: { ...(prevState.Columns ?? {}), [option]: value },
    }));
  };

  const setColumnValue = (columnId, option, value) => {
    setUserPdfSettings((prevState) => {
      const prevColumns = prevState.Columns ?? {};
      const prevValues = prevColumns.values ?? {};
      return {
        ...prevState,
        Columns: {
          ...prevColumns,
          values: { ...prevValues, [columnId]: { ...(prevValues[columnId] ?? {}), [option]: value } },
        },
      };
    });
  };

  return (
    <>
      <div className="relative mt-3">
        <MultiSelect field="columnWidth" fieldDef={MODE_DEF} value={state.columnWidth ?? 'auto'} onChange={(value) => setMode('columnWidth', value)} />
      </div>
      {
        state.columnWidth === 'manual' &&
        <div className="ml-3">
          {columns.map(({ columnId }) => (
            <div key={columnId} className="relative mt-3">
              <label className="absolute select-none z-10 -top-2 left-2 inline-block bg-base-300 px-1 text-xs font-medium text-secondary">
                {columnId} width
              </label>
              <input
                type="number"
                min="0"
                placeholder="auto"
                value={values[columnId]?.width ?? ''}
                onChange={(e) => setColumnValue(columnId, 'width', e.target.value)}
                className="block w-full rounded-lg border-0 bg-base-300 py-1.5 text-secondary shadow-sm ring-1 ring-inset ring-secondary placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pl-3"
              />
            </div>
          ))}
        </div>
      }

      <div className="relative mt-3">
        <MultiSelect field="columnAlignment" fieldDef={MODE_DEF} value={state.columnAlignment ?? 'auto'} onChange={(value) => setMode('columnAlignment', value)} />
      </div>
      {
        state.columnAlignment === 'manual' &&
        <div className="ml-3">
          {columns.map(({ columnId }) => (
            <div key={columnId} className="relative mt-3">
              <MultiSelect field={`${columnId} align`} fieldDef={ALIGN_DEF} value={values[columnId]?.align ?? 'left'} onChange={(value) => setColumnValue(columnId, 'align', value)} />
            </div>
          ))}
        </div>
      }

      <div className="relative mt-3">
        <MultiSelect field="wrapText" fieldDef={WRAP_MODE_DEF} value={state.wrapText ?? true} onChange={(value) => setMode('wrapText', value)} />
      </div>
      {
        state.wrapText === 'manual' &&
        <div className="ml-3">
          {columns.map(({ columnId }) => (
            <div key={columnId} className="relative mt-3">
              <MultiSelect field={`${columnId} wrapText`} fieldDef={WRAP_DEF} value={values[columnId]?.wrapText ?? true} onChange={(value) => setColumnValue(columnId, 'wrapText', value)} />
            </div>
          ))}
        </div>
      }
    </>
  );
}


export function Examples({examples, onExampleChange}) {
    return (
        <ul className="menu menu-vertial bg-base-300 text-secondary">
            {
                examples.map((ex) => {
                    return (
                    <li key={ex.name}><button type="button" onClick={() => onExampleChange(ex.name)} className={` ${ex.current ? 'underline' : ''}`}>{ex.name}</button></li>
                    )
                })
            }
        </ul>
    )
}
