import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(async () => {
    page = new AppPage();
    await browser.waitForAngularEnabled(false);
    await page.navigateTo();
    await browser.navigate().refresh();
  });

  it('should display correct labels', async () => {
    expect(await page.getLabels()).toEqual(['Name', 'Email', 'Checkbox with confirmation']);
  });

  it('should disable submit when form is invalid', async () => {
    expect(await page.submitButtonDisabled()).toBe(true);
  });

  it('should toggle visibility correctly', async () => {
    expect(await page.fieldHidden('Hidden Field')).toBe(true);
    await page.toggleFieldVisibility('Hidden Field');
    expect(await page.fieldHidden('Hidden Field')).toBe(false);
    expect(await page.getLabels()).toEqual(['Name', 'Email', 'Checkbox with confirmation', 'Hidden Field']);

    expect(await page.fieldHidden('Name')).toBe(false);
    await page.toggleFieldVisibility('Name');
    expect(await page.fieldHidden('Name')).toBe(true);
    expect(await page.getLabels()).toEqual(['Email', 'Checkbox with confirmation', 'Hidden Field']);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
