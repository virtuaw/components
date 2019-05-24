import { newE2EPage } from '@stencil/core/testing';

describe('vaw-piano', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<vaw-piano />');
    const element = await page.find('vaw-piano');
    expect(element).toHaveClass('hydrated');
  });
});
