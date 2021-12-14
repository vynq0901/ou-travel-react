import React, { memo, useState, useRef } from "react"
import './ButtonSwitch.css'

function ButtonSwitch({listButton,handleSort}) {
    const refs = useRef([])
    const buttonStyle = {
        border: "1px solid #07253F",
        color: "#fff",
        background: "#07253F",
    }
    
    const [switchButton, setSwitchButton] = useState(0)

    const handleClick = (btn,index) => {
        handleSort(btn.id)
        setSwitchButton(index)
    }

    return (
        <div className="switch-section">
            {
                listButton.map((btn,index) => (
                    <input 
                        type="button" 
                        value={btn.value}
                        id={btn.id}
                        className="switch-btn radius-10"
                        ref={(ele) => refs.current[index] = ele}
                        style={switchButton === index ? buttonStyle : null}
                        onClick={switchButton === index ? null : () => handleClick(refs.current[index],index)}
                        key={index}
                    />
                ))
            }
        </div>
    )
}

export default memo(ButtonSwitch)