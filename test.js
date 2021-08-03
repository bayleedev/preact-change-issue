import React, { useState } from 'react';

import { act, createEvent, waitFor, render, fireEvent, screen } from '@testing-library/preact';

const ProfileViewer = () => {
  const [body, setBody] = useState('default_value');

  return (
    <div>
      <input type='text' data-testid='comment-body-2' placeholder='blahhh' value={body} />
      <label>
        Comment Body
        <input
          type="text"
          placeholder='meow'
          data-testid='comment-body'
          value={body}
          onChange={(ev) => setBody('on_change_value')}
        />
      </label>
      <div data-testid='body-data'>{body}</div>
      <input type='submit' value='Add Comment' />
    </div>
  );
};

test('can change textarea', async () => {
  render(<ProfileViewer  />);
  // Default value
  {
    const node = screen.getByRole('textbox', { name: 'Comment Body' });
    expect(node.value).toEqual('default_value');
  }

  // Change
  if (false) {
    const field = await screen.getByRole('textbox', { name: 'Comment Body' });
    fireEvent.change(field, {
      value: 'user123', // the docs just suggest setting this one
    });
    expect(field.value).toEqual('user123'); // Received: "default_value"
  }

  // Change, working
  {
    const field = await screen.getByRole('textbox', { name: 'Comment Body' });
    const changeEvent = createEvent.change(field, {
      value: 'user123', // BROKE
      target: { value: 'user234' }, // ADD
    });
    changeEvent.inputType = 'insertText'; // ADD
    await act(() => {
      return field.l.inputfalse(changeEvent);
      // return field.dispatchEvent(changeEvent) // DEL
    });
    // Assertion
    const textarea = screen.getByRole('textbox', { name: 'Comment Body' });
    expect(textarea.value).toEqual('on_change_value'); // SUCCESS!

    // Double assertion, to see if `body` was updated.
    const bodyData = screen.getByTestId('body-data');
    expect(bodyData.textContent).toEqual('on_change_value'); // SUCCESS!
  }
})
