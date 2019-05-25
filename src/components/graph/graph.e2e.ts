import { newE2EPage } from '@stencil/core/testing';

describe('graph', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<graph />');
    const element = await page.find('graph');
    expect(element).toHaveClass('hydrated');
  });
});
