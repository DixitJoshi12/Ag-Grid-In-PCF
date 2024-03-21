/*
 * Theme.tsx
 * Description: React component for changing the theme of the grid
 * Author: Dixit Joshi
 * Version: 1.0.1
 * License: MIT
 */
import React from "react";
interface SelectComponentProps{
    options : {[key:string]:string},
    onSelect : (selectedOptions: string) => void;
}
interface Options {
    [key: string]: string
}
export const option: Options = {
    Alpine: "ag-theme-alpine",
    Custom: "ag-theme-quartz",
    Balham: "ag-theme-balham",
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