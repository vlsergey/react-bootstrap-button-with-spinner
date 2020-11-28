// @flow

import assert from 'assert';
import ButtonWithSpinner from '../src/ButtonWithSpinner';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

function sleep( ms : number ) : Promise< any > {
  return new Promise( resolve => setTimeout( resolve, ms ) );
}

describe( 'ButtonWithSpinner', () => {

  it( 'display spinner until onClick is completed', async() => {

    let resolve : () => any = () => {};
    const promise : Promise< any > = new Promise( ( r : () => any ) => {
      resolve = r;
    } );
    const handler = () => promise;

    const rendered = ReactTestUtils.renderIntoDocument( <ButtonWithSpinner onClick={handler}>
      {'Some text'}
    </ButtonWithSpinner> );

    const spinnersBeforeClick = ReactTestUtils.scryRenderedDOMComponentsWithClass( rendered, 'spinner-border' );
    assert.equal( spinnersBeforeClick.length, 0 );

    const buttonNode = ReactTestUtils.findRenderedDOMComponentWithTag( rendered, 'button' );
    ReactTestUtils.Simulate.click( buttonNode );

    await sleep( 0 );
    const spinnersAfterClick = ReactTestUtils.scryRenderedDOMComponentsWithClass( rendered, 'spinner-border' );
    assert.equal( spinnersAfterClick.length, 1 );

    resolve();
    await sleep( 0 );
    const spinnersAfterResolve = ReactTestUtils.scryRenderedDOMComponentsWithClass( rendered, 'spinner-border' );
    assert.equal( spinnersAfterResolve.length, 0 );

  } );
} );
