import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

test('markdown is updated when user clicks send button', () => {
    // Arrange
    const {container, getByTestId, getByText} = render(<App />);
    const markdownContainer = container.querySelector('.markdown-container');
    const userInputTextArea = getByTestId('user-input');
    const sendButton = getByText(/send/i);
    const expectedHtml = `<p><strong>Lorem ipsum</strong> dolor <em>sit amet</em></p>`;

    // Act 
    fireEvent.change(userInputTextArea, {target : {value : "**Lorem ipsum** dolor *sit amet*"}});
    fireEvent.click(sendButton);

    // Assert
    expect(markdownContainer.innerHTML).toBe(expectedHtml);

})
