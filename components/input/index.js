import React from 'react'

function InputGroup({ input_value, set_value, input_id, input_label, input_type, input_min, input_first }) {
    return (
        <div className={`input ${input_first}`}>
            <label htmlFor={input_id}>{input_label}</label>
            <input 
                type={input_type} 
                id={input_id} 
                min={input_min || 0}
                value={input_value}
                onChange={e => set_value(e.target.value)}
            />
        </div>
    )
}

export default InputGroup
