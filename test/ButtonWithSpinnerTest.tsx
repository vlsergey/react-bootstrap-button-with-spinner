import {assert} from 'chai';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

import ButtonWithSpinner from '../src/ButtonWithSpinner';

function sleep (ms: number): Promise< void > {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('ButtonWithSpinner', () => {

  it('display spinner until onClick is completed', async () => {

    let resolve: () => void;
    const promise: Promise< void > = new Promise<void>((r: () => void) => {
      resolve = r;
    });
    const handler = () => promise;

    const rendered = ReactTestUtils.renderIntoDocument(<ButtonWithSpinner onClick={handler}>
      {'Some text'}
    </ButtonWithSpinner>) as unknown as ButtonWithSpinner;

    const spinnersBeforeClick = ReactTestUtils.scryRenderedDOMComponentsWithClass(rendered, 'spinner-border');
    assert.equal(spinnersBeforeClick.length, 0);

    const buttonNode = ReactTestUtils.findRenderedDOMComponentWithTag(rendered, 'button');
    ReactTestUtils.Simulate.click(buttonNode);

    await sleep(0);
    const spinnersAfterClick = ReactTestUtils.scryRenderedDOMComponentsWithClass(rendered, 'spinner-border');
    assert.equal(spinnersAfterClick.length, 1);

    resolve();
    await sleep(0);
    const spinnersAfterResolve = ReactTestUtils.scryRenderedDOMComponentsWithClass(rendered, 'spinner-border');
    assert.equal(spinnersAfterResolve.length, 0);

  });

  it('Correctly passes properties to react bootstrap Button', () => {
    const rendered = ReactTestUtils.renderIntoDocument(<ButtonWithSpinner as="div">
      {'Hello, World!'}
    </ButtonWithSpinner>) as unknown as ButtonWithSpinner;

    const divNode = ReactTestUtils.findRenderedDOMComponentWithTag(rendered, 'div');
    assert.equal(divNode.textContent, 'Hello, World!');
  });

});
