// import React from "react";
interface InputFieldProps {
    label: string;
    value: string;
    onChange: (val: string) => void;
    type?: string;
}

   const InputField = ({ label, value, onChange, type = 'text'} :
                       InputFieldProps  ) =>{

       return (
           <div className="mb-4">
               <label className="block text-sm mb-1">{label}</label>
               <input
                   type={type}
                   value={value}
                   onChange={(e) => onChange(e.target.value)}
                   className="w-full border rounded p-2"
               />
           </div>
       );
   };

export default InputField;