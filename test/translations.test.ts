import { describe, test, expect } from '@jest/globals';
import en from '../src/translations/en';
import nb from '../src/translations/nb';

describe('Compare language files', () => {
    const nbKeys = [...Object.keys(nb)]; // All language files should be based on the Norwegian language file.
    const nbVals = [...Object.values(nb)];

    [en].forEach(translations => {
        const keys = [...Object.keys(translations)];
        const vals = [...Object.values(translations)];
        
        test('', () => expect(keys.length).toBe(nbKeys.length));

        nbKeys.forEach((nbKey, i) => {
            test(`Translation for '${nbKey}' should be present`, () => expect(keys.find(key => key === nbKey)).not.toBe(undefined));
            
            if([
                'total',
                'dropdown.filter.default.option'
            ].indexOf(nbKey) !== -1) return;

            const nbVal = nbVals[i];
            const val = vals[keys.indexOf(nbKey)];
            test(`Translations for '${nbKey}' should not be equal`, () => expect(nbVal).not.toBe(val));
        });

        keys.forEach(key => {
            test(`Expect no superfluous translation for '${key}'`, () => expect(nbKeys.find(nbKey => nbKey === key)).not.toBe(undefined));
        });
    });
});