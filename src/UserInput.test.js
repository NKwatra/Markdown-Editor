import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import UserInput from './UserInput';

test('user input updates when new text is entered',() => {
    // Arrange
    const {getByTestId} = render(<UserInput />)
    const userInputTextArea = getByTestId('user-input');
    const initialInput = userInputTextArea.value;
    const newText = "Lorem ipsum dolor sit amet";
    
    // Act
    fireEvent.change(userInputTextArea, {target : {value : newText}});

    // Assert
    expect(initialInput).toBe("");
    expect(userInputTextArea.value).toBe(newText);
});

test('clicking italic button adds "*" to user input and input remains focussed', () => {
    // Arrange
    const {getByTestId} = render(<UserInput />);
    const boldOption = getByTestId('bold-option');
    const userInputTextArea = getByTestId('user-input');
    let intialValue = userInputTextArea.value;

    // Act
    fireEvent.click(boldOption)

    // Assert
    expect(userInputTextArea.value).toBe(intialValue + "**");
    expect(userInputTextArea === document.activeElement).toBeTruthy()
});

test('clicking bold button adds "**" to user input and input remains focussed', () => {
    // Arrange
    const {getByTestId} = render(<UserInput />);
    const italicOption = getByTestId('italic-option');
    const userInputTextArea = getByTestId('user-input');
    let intialValue = userInputTextArea.value;

    // Act
    fireEvent.click(italicOption)

    // Assert
    expect(userInputTextArea.value).toBe(intialValue + "*");
    expect(userInputTextArea === document.activeElement).toBeTruthy()
});

test('bold and italic option change color on click', ()=> {
    // Arrange
    const {getByTestId} = render(<UserInput />);
    const boldOption = getByTestId('bold-option');
    const italicOption = getByTestId('italic-option');
    const boldOptionSVG = getByTestId('bold-svg');
    const italicOptionSVG = getByTestId('italic-svg');
    const boldOptionColor = boldOptionSVG.getAttribute('fill');
    const italicOptionColor = italicOptionSVG.getAttribute('fill');

    // Act
    fireEvent.click(boldOption);
    fireEvent.click(italicOption);

    // Assert
    expect(boldOptionSVG.getAttribute('fill')).not.toBe(boldOptionColor);
    expect(italicOptionSVG.getAttribute('fill')).not.toBe(italicOptionColor);
});

test('correct markdown sent on pressing send button and user input is cleared',() => {
    // Arrange
    const handleSend = jest.fn();
    const {getByText, getByTestId} = render(<UserInput sendMarkdown={handleSend}/>)
    const sendButton = getByText(/send/i);
    const userInputTextArea = getByTestId('user-input');
    const newUserInput = "Some *random **markdown***";

    // Act
    fireEvent.change(userInputTextArea, {target : {value : newUserInput}});
    fireEvent.click(sendButton);


    // Assert
    expect(handleSend).toHaveBeenCalledTimes(1);
    expect(handleSend).toHaveBeenCalledWith(newUserInput);
    expect(userInputTextArea.value).toBe("");
});

test('markdown is valid and options are de-selected before sending user input', () => {
    // Arrange
    const handleSend = jest.fn();
    const {getByTestId, getByText} = render(<UserInput sendMarkdown={handleSend} />)
    const userInputTextArea = getByTestId('user-input');
    const boldOption = getByTestId('bold-option');
    const italicOption = getByTestId('italic-option');
    const sendButton = getByText(/send/i);
    const boldOptionSVG = getByTestId('bold-svg');
    const italicOptionSVG = getByTestId('italic-svg');
    const newInput = "**Lorem ipsum *dolor sit amet";

    // Act
    fireEvent.click(boldOption);
    fireEvent.click(italicOption);
    fireEvent.change(userInputTextArea, {target : {value : newInput}});
    fireEvent.click(sendButton);

    // Assert
    expect(handleSend).toHaveBeenCalledTimes(1);
    expect(handleSend).toHaveBeenCalledWith(newInput + "***");
    expect(boldOptionSVG.getAttribute('fill')).toBe("#000000");
    expect(italicOptionSVG.getAttribute('fill')).toBe("#000000");
})