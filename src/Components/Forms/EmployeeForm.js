import {  DateBox, SelectBox, TextArea, TextBox } from "devextreme-react";
import { useState } from "react";

const EmployeeForm =()=>{
    const [formData,setFormData] = useState({
        fullName :"",
        hireDate:"",
        contact:"",

    })
    const handleInputChange =()=>{
        setFormData(formData);
        
    };

    return(
        <div className="fixed top-16 right-4 bg-white p-6 rounded-lg shadow-lg w-[600px] max-w-full z-50 h-[80vh] overflow-y-auto">
        <form>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="mb-4">
        <TextBox
        id="fullName"
        name="fullName"
        value=""
        onValueChanged={""}
        className=""
        label="Full name"
        labelMode="floating"
        />
        </div> 
        <div className="mb-4">
        <TextBox
        id="contact"
        name="contact"
        value=""
        onValueChanged={""}
        className=""
        label="Contact"
        labelMode="floating"
        />
        </div> 
        <div className="mb-4">
            <DateBox
              id="hireDate"
              name="hireDate"
              value={formData.hireDate}
              onValueChanged={(e) => handleInputChange({ target: { name: 'hireDate', value: e.value } })}
              className="w-full"
              label="Hire Date"
              labelMode="floating"
              max={new Date(new Date().setFullYear(new Date().getFullYear() - 18))} // Set max date to 18 years ago
            />
          </div>
          <div className="mb-4">
            <SelectBox
              id="gender"
              name="gender"
              value={formData.gender}
              onValueChanged={(e) => handleInputChange({ target: { name: 'gender', value: e.value } })}
              className="w-full"
              label="Gender"
              labelMode="floating"
              items={[
                { value: '', text: 'Select Gender' },
                { value: 'Male', text: 'Male' },
                { value: 'Female', text: 'Female' },
              ]}
              displayExpr="text"
              valueExpr="value"
            />
          </div>
 
        </div> 
        </form> 
        </div> 
    )

}
export default EmployeeForm;