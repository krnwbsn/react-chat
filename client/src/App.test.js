import React from 'react';
import { render } from '@testing-library/react';
import ChatBox from './components/chatBox';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ChatBox />, div);
  ReactDOM.unmountComponentAtNode(div);
});
