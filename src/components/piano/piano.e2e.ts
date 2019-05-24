import { newE2EPage } from '@stencil/core/testing';

describe('piano', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<piano />');
    const element = await page.find('piano');
    expect(element).toHaveClass('hydrated');
  });
});
