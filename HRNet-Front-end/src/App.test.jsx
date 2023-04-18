import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { App, WrappedApp } from './App';

// describe("App", ()=>{
//   it("Renders Salut", () =>{
//     // arrange
//     // act
//     // expect
//   })
// })

//Vitest is created for unit test

// testing the react router
describe('App', () => {
  it('Renders Welcome', () => {
    // arrange
    render(<WrappedApp />);
    // act (click a buttonn, etc)
    // expect
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Welcome'
    );
    // https://www.youtube.com/watch?v=cchqeWY0Nak&t=2793s à 35min check query method to test
  });
  it('Renders Error page if invalid path', () => {
    //in testing library react, part on react router
    render(
      <MemoryRouter initialEntries={['/this-route-does-not-exist']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Error'
    );
  });
});
