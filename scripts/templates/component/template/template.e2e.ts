import { newE2EPage } from '@stencil/core/testing';

describe('template', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<template />');
    const element = await page.find('template');
    expect(element).toHaveClass('hydrated');
  });
});
