import { newE2EPage } from '@stencil/core/testing';

describe('graph-node', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<graph-node />');
    const element = await page.find('graph-node');
    expect(element).toHaveClass('hydrated');
  });
});
