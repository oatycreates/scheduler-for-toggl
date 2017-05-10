describe('Index', () => {
  beforeEach(() => {
    // Mock a DOM mount point
    document.body.innerHTML =
      '<div id="root"></div>';
  });

  it('renders without crashing', () => {
    require('./index');
  });
});

