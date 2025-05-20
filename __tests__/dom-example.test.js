test('should create a DOM element', () => {
  const div = document.createElement('div');
  div.id = 'test';
  document.body.appendChild(div);

  const el = document.getElementById('test');
  expect(el).not.toBeNull();
});
