import React, {useState, useRef} from 'react';
import Bold from './Bold';
import Italic from './Italic';

/* Component to handle user input (plain text)*/
function UserInput(props) {
    /* 
        Internal state to keep track of text entered by user
        as well as whether any of options (bold,italic is selected) 
    */
    const [text, setText] = useState("");
    const [options, setOptions] = useState({
        bold : false,
        italic : false
    });

    /* 
        Reference to user input element, used to focus input element
    */
    const textInputRef = useRef(null)

    /* 
        Function to handle change in options, called when either
        bold or italic is selected/de-selected
    */
    const handleOptionChange = option => {
        // check which option was changed
        if(option === "bold")
        {
            /* 
            add '**' to make text bold and update internal state
            of options to reflect changes
            */
            setText(prevText => prevText + "**");
            setOptions(prevOptions => ({
                ...prevOptions,
                bold : !prevOptions["bold"]
            }));
        }else if(option === "italic")
        {
            /*
                Add single asterik for italics
            */
            setText(prevText => prevText + "*");
            setOptions(prevOptions => ({
                ...prevOptions,
                italic : !prevOptions["italic"]
            }));
        }
        
        /* 
            When any option is clicked input element loses focus,
            refocus input element for better user experience
        */
        textInputRef.current.focus();
    }

    /* 
        Constants to decide color of bold and italic option
    */
    const optionSelectedColor = "#1a73e8";
    const optionDefaultColor = "#000000";
    const boldOptionColor = options["bold"] ? optionSelectedColor : optionDefaultColor;
    const italicOptionColor = options["italic"] ? optionSelectedColor : optionDefaultColor;
    
    return (
        <div className="input-container">
            {/* textarea : for user input
                divider : to add a divider line
                Bold, Italic : components for bold and italic button
                send-button : to send markdown text
            */}
            <textarea className="text-input" rows={4} value={text} onChange={event => setText(event.target.value)} placeholder="Please enter text here" autoFocus ref={textInputRef} data-testid="user-input" />
            <div className="divider"/>
            <div>
                <div className="option" onClick={() => handleOptionChange("bold")} data-testid="bold-option">
                    <Bold fill={boldOptionColor}/>
                </div>
                <div className="option" onClick={() => handleOptionChange("italic")} data-testid="italic-option">
                    <Italic fill={italicOptionColor} />
                </div>
                <button className="send-button" onClick={() => {
                    {/* 
                        Check if bold or italic is selected, add
                        '**' or '*' respectively to make markdown valid
                        and de-select the option
                    */}
                    let markdownText = text;
                    if(options["bold"])
                    {
                        markdownText += "**";
                        handleOptionChange("bold");
                    }
                    if(options["italic"])
                    {
                        markdownText += "*";
                        handleOptionChange("italic")
                    }
                    {/* 
                        update state of parent component to display
                        markdown in renderer and clear text input
                    */}
                    props.sendMarkdown(markdownText);
                    setText("");
                    }
                    }>SEND</button>
            </div>
        </div>
    )
}

export default UserInput;