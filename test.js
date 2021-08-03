import React, { useState } from 'react';

import { waitFor, render, fireEvent, screen } from '@testing-library/preact';

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
          onChange={(ev) => setBody('rawwwwr')}
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
  const field = await screen.getByRole('textbox', { name: 'Comment Body' });
  console.log('src', fireEvent.change.toString());
  return fireEvent.change(field, { value: 'user123', target: { value: 'user234' } }).then(() => {
    // Assertion
    const bodyData = screen.getByTestId('body-data');
    console.log('bodyData', bodyData.textContent);

    const textarea = screen.getByRole('textbox', { name: 'Comment Body' });
    console.log('textarea', textarea.value);
  });
})
