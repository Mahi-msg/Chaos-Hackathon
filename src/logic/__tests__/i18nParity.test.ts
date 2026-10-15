import { describe, it, expect } from 'vitest';
import en from '../../i18n/en.json';
import hi from '../../i18n/hi.json';
import kn from '../../i18n/kn.json';

describe('i18n Key Parity and Translation Completeness', () => {
  const enKeys = Object.keys(en).sort();
  const hiKeys = Object.keys(hi).sort();
  const knKeys = Object.keys(kn).sort();

  it('has identical keys in en.json and hi.json', () => {
    const missingInHi = enKeys.filter((k) => !(k in hi));
    const extraInHi = hiKeys.filter((k) => !(k in en));

    expect(missingInHi, `Missing keys in hi.json: ${missingInHi.join(', ')}`).toEqual([]);
    expect(extraInHi, `Extra keys in hi.json: ${extraInHi.join(', ')}`).toEqual([]);
    expect(hiKeys.length).toBe(enKeys.length);
  });

  it('has identical keys in en.json and kn.json', () => {
    const missingInKn = enKeys.filter((k) => !(k in kn));
    const extraInKn = knKeys.filter((k) => !(k in en));

    expect(missingInKn, `Missing keys in kn.json: ${missingInKn.join(', ')}`).toEqual([]);
    expect(extraInKn, `Extra keys in kn.json: ${extraInKn.join(', ')}`).toEqual([]);
    expect(knKeys.length).toBe(enKeys.length);
  });

  it('ensures no translation values are empty', () => {
    for (const [key, val] of Object.entries(en)) {
      expect(typeof val === 'string' && val.trim().length > 0, `en.${key} is empty`).toBe(true);
    }
    for (const [key, val] of Object.entries(hi)) {
      expect(typeof val === 'string' && val.trim().length > 0, `hi.${key} is empty`).toBe(true);
    }
    for (const [key, val] of Object.entries(kn)) {
      expect(typeof val === 'string' && val.trim().length > 0, `kn.${key} is empty`).toBe(true);
    }
  });

  it('contains the mandatory clinical review TODO notice in hi.json and kn.json comments', () => {
    expect((hi as any)._comment).toContain('TODO: The Hindi translations must be reviewed by native speakers and a clinician');
    expect((kn as any)._comment).toContain('TODO: The Kannada translations must be reviewed by native speakers and a clinician');
  });
});
