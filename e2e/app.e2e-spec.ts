import { LawAppPage } from './app.po';

describe('law-app App', () => {
  let page: LawAppPage;

  beforeEach(() => {
    page = new LawAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
