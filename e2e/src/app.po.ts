import { browser, by, element, ExpectedConditions } from 'protractor';

export class AppPage {
  private readonly _dynamicForm = element(by.css('app-dynamic-form'));
  private readonly _visibilityToggleButtons = this._dynamicForm.element(by.css('nb-card-header'));
  private readonly _form = this._dynamicForm.element(by.css('form'));
  private readonly _submitButton = this._form.element(by.css('button[type=submit]'));

  async navigateTo(): Promise<void> {
    await browser.get('');
  }

  async getLabels(): Promise<string[]> {
    await browser.wait(ExpectedConditions.visibilityOf(this._dynamicForm));
    return await this._dynamicForm.all(by.css(`label > span`)).map(label => label.getText());
  }

  async submitButtonDisabled(): Promise<boolean> {
    await browser.wait(ExpectedConditions.visibilityOf(this._submitButton));
    return await this._submitButton.getAttribute('disabled') !== null;
  }

  async fieldHidden(name: string): Promise<boolean> {
    await browser.wait(ExpectedConditions.visibilityOf(this._form));
    return !(await this._form.element(by.cssContainingText('label > span', name)).isDisplayed());
  }

  async toggleFieldVisibility(name: string): Promise<void> {
    await browser.wait(ExpectedConditions.visibilityOf(this._visibilityToggleButtons));
    return await this._form.element(by.cssContainingText('button', name)).click();
  }
}
