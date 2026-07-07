import { CheckIcon, ChevronUpDownIcon, SparklesIcon} from '@heroicons/react/20/solid'
import { getPaidFeatures } from '../lib/paidFeatures';

export function StandardField({field, fieldDef, userPdfSettings, setUserPdfSettings, section}) {

    return (
        <>
           <FieldName field={field}/>
           <input
                type={fieldDef.type}
                name="name"
                id="name"
                className="input appearance-none input-bordered input-secondary input-sm w-full bg-base-300"
                onChange={(e) => handleFieldChange(e.target.value, field, setUserPdfSettings, section, userPdfSettings)}
                placeholder='Auto'
                value={userPdfSettings[section][field] ?? ''}
            />
        </>
    )
}

const handleFieldChange = (value, field, setUserPdfSettings, section, userPdfSettings) => {
    
    if(field === 'cellTextSize'){

        setUserPdfSettings((prevState) => ({
            ...prevState,
            [section]: {
                ...prevState[section], 
                [field]: Number(value),
                cellLineHeight: Math.max(userPdfSettings.Cell.cellLineHeight, value)
            },
          })
        );

    } 
    else {
        setUserPdfSettings((prevState) => ({
            ...prevState,
            [section]: {...prevState[section], [field]: value}
          })
        );

    }
    
}

function FieldName({ field }) {
  
  const paidFeatures = getPaidFeatures();

  return (
    <>
      {
        paidFeatures.includes(field) ?
             <label
                htmlFor="name"
                className="absolute select-none -top-2 left-2 inline-block bg-base-300 px-1 text-xs font-medium text-secondary"
            >
                {field} <SparklesIcon className={`absolute -top-1 -right-1 text-yellow-400 w-3 h-3`}/>
            </label>
          : 
             <label
                htmlFor="name"
                className="absolute select-none -top-2 left-2 inline-block bg-base-300 px-1 text-xs font-medium text-secondary"
            >
                {field}
            </label>
      }
    </>
  )
};
