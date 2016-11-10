import { AbnerPage } from './app.po';

describe('abner App', function() {
  let page: AbnerPage;

  beforeEach(() => {
    page = new AbnerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
