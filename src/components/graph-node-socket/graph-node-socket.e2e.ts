import { newE2EPage } from '@stencil/core/testing';

describe('graph-node-socket', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<graph-node-socket />');
    const element = await page.find('graph-node-socket');
    expect(element).toHaveClass('hydrated');
  });
});
