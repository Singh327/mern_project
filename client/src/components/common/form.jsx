import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import React from 'react'
import {Input} from  "@/components/ui/input"
import {Textarea} from '@/components/ui/textarea'
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";


 
function CommonForm({isBtnDisabled,formControls , formData, setFormData,onSubmit, buttonText}) {

  function renderInputsbyComponentType(getControlItem) {
     let element = null;
      const value = formData[getControlItem.name] || ''

     switch(getControlItem.componentType) {
       case 'input':
         element = <Input 
         name= {getControlItem.name} 
         placeholder={getControlItem.placeholder}
         id = {getControlItem.name}
         type = {getControlItem.type}
         value = {value}
         onChange = {event => setFormData({
            ...formData,
            [getControlItem.name] : event.target.value,
         })

         }
         />
        break;

        case 'select':
         element = (
          <Select onValueChange={(value)=> setFormData({
            ...formData,
            [getControlItem.name] : value
          })} value = {value}>
            <SelectTrigger className="w-full">
               <SelectValue placeholder={getControlItem.label}/>
            </SelectTrigger>
            <SelectContent>
               {
                    getControlItem.options &&
                  getControlItem.options.length > 0 ?
                  getControlItem.options.map(optionItem=> (<SelectItem key= {optionItem.id} value={optionItem.id}>{optionItem.label}</SelectItem>)) 
                  : null
                }
            </SelectContent>
          </Select>
         );
        break;

        case 'textarea':
         element = 
         (
          <Textarea value = {value}
          name = {getControlItem.name}
          placeholder = {getControlItem.placeholder}
          id = {getControlItem.name}
            onChange = {event => setFormData({
            ...formData,
            [getControlItem.name] : event.target.value,
         })

         }
          />
         );
        break;


       default:
         element = <Input 
         name= {getControlItem.name} 
         placeholder={getControlItem.placeholder}
         id = {getControlItem.name}
         type = {getControlItem.type}
         onChange = {event => setFormData({
            ...formData,
            [getControlItem.name] : event.target.value,
         })

         }
         />
          break;
        }
     
    
     return element;
}

  return (
    <form onSubmit={onSubmit}>
        <div className='flex flex-col gap-3'>
            {
              formControls.map(controlItem => (<div className='grid w-full gap-1.5' key = {controlItem.name}>
                <Label className="mb-1">{controlItem.label} </Label>
                 {
                   renderInputsbyComponentType(controlItem)
                 }
                  </div>))
            }
        </div>
        <Button type="submit" disabled = {isBtnDisabled} className="mt-2 w-full">{buttonText || 'Submit'}</Button>
    </form>
  )
}

export default CommonForm
