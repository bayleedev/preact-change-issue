import React, { useState } from 'react';

import { waitFor, render, fireEvent, screen } from '@testing-library/preact';

const ProfileViewer = () => {
  const [body, setBody] = useState('default_value');

  return (
    <div>
      <input type='text' data-testid='comment-body-2' placeholder='blahhh' value={body} />
      <label>
        Comment Body
        <textarea
          placeholder='meow'
          data-testid='comment-body'
          value={body}
          onChange={(ev) => setBody('rawwwwr')}
        />
      </label>
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
  {
    const field = await screen.findByRole('textbox', { name: 'Comment Body' });
    fireEvent.change(field, { value: 'user123' });
  }

  // Assertion
  {
    const node = screen.getByRole('textbox', { name: 'Comment Body' });
    expect(node.value).toEqual('user123');
  }
})
