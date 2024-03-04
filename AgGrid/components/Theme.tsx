import React from "react";
interface SelectComponentProps{
    options : {[key:string]:string},
    onSelect : (selectedOptions: string) => void;
}
const Theme: React.FC<SelectComponentProps> = ({options,onSelect})=>{
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>)=>{
        const selectedOption = e.target.value;
        onSelect(selectedOption);
    }
    return (
        <div style={{display:'inline-block' }} >
        <label style={{color:'blue',display:'inline-block'}}>Select Theme:</label>
        <select  onChange={handleSelectChange}>
        {    
            Object.entries(options).map(([key,value])=>(
                <option value={value}>{key}</option>
            ))
        }
        </select>
        </div>
    );
}

export default Theme;