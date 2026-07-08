import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { createPDFTables } from 'pdf-lib-table';
import { buildPdfSettings } from '../../lib/buildPdfSettings';

const FONT_NAMES = [
    'Courier',
    'CourierBold',
    'CourierBoldOblique',
    'CourierOblique',
    'Helvetica',
    'HelveticaBold',
    'HelveticaBoldOblique',
    'HelveticaOblique',
    'TimesRoman',
    'TimesRomanBold',
    'TimesRomanBoldItalic',
    'TimesRomanItalic',
];

export class Doc {
    constructor(example) {
        this._example = example;
    }

    set type(type) {
        this._example = type;
    }

    get type() {
        return this._example;
    }

    async draw({ userPdfSettings, setPdfUrl }) {
        const pdfDoc = await PDFDocument.create();

        //pageOrientation is a tester-side setting (the package inherits whatever
        //page it is given, and creates appended pages at the same size)
        const sectioned = userPdfSettings ?? this._example.defaultSettings;
        const portrait = sectioned.Table?.pageOrientation === 'portrait';
        const page = pdfDoc.addPage(portrait ? [612.0, 792.0] : [792.0, 612.0]);
        const data = await this._example.data;

        const embeddedFonts = await Promise.all(FONT_NAMES.map((name) => pdfDoc.embedStandardFont(StandardFonts[name])));
        const fontLookup = Object.fromEntries(FONT_NAMES.map((name, i) => [name, embeddedFonts[i]]));

        // the form's sectioned settings drive the table; the example only provides defaults
        const settings = buildPdfSettings({
            settings: userPdfSettings ?? this._example.defaultSettings,
            page,
            fontLookup,
        });

        const newDataFormat = data.map((row) => {
            if (row.subheading) return { type: 'subheading', data: { ...row.subheading } };
            return { type: 'row', data: { ...row } };
        });

        const tables = await createPDFTables(
            newDataFormat,
            page,
            pdfDoc,
            this._example.columnDefs,
            StandardFonts,
            rgb,
            settings,
        );

        tables.drawVerticalTables();

        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
        setPdfUrl(URL.createObjectURL(blob));

        return settings;
    }
}
