import { FilterTariffPipe } from './filter.tariffs.pipe';

describe('FilterTariffPipe', () => {
  it('creado correctamente', () => {
    const pipe = new FilterTariffPipe();
    expect(pipe).toBeTruthy();
  });
});
