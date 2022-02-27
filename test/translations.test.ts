import { describe, test, expect } from '@jest/globals';
import en from '../src/translations/en';
import nb from '../src/translations/nb';

describe('Compare language files', () => {
    const nbKeys = [...Object.keys(nb)]; // All language files should be based on the Norwegian language file.

    [en].forEach(translations => {
        const keys = [...Object.keys(translations)];
        
        test('', () => expect(keys.length).toBe(nbKeys.length));

        nbKeys.forEach(nbKey => {
            test(`Translation for '${nbKey}' should be present`, () => expect(keys.find(key => key === nbKey)).not.toBe(undefined));
        });

        keys.forEach(key => {
            test(`Expect no superfluous translation for '${key}'`, () => expect(nbKeys.find(nbKey => nbKey === key)).not.toBe(undefined));
        });
    });
});