import { FilterClientPipe } from './filter.clients.pipe';

describe('FilterClientPipe', () => {
  it('creado correctamente', () => {
    const pipe = new FilterClientPipe();
    expect(pipe).toBeTruthy();
  });
});
