import React from 'react';

/* 
    Component for 'italic' icon
*/
function Italic(props)
{
    return (
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="italic" className="svg-inline--fa fa-italic fa-w-10 icon-responsive" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path fill={props.fill} d="M320 48v32a16 16 0 0 1-16 16h-62.76l-80 320H208a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16H16a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16h62.76l80-320H112a16 16 0 0 1-16-16V48a16 16 0 0 1 16-16h192a16 16 0 0 1 16 16z" data-testid="italic-svg"></path>
        </svg>
    )
}

export default Italic;