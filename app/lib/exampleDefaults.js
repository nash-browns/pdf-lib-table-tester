import { rgb } from 'pdf-lib';
import { subheadingColumnDefs } from '../definition';

// Sectioned default settings for each example, in the same shape the settings
// form edits ({ Table, Header, Row, Cell, Subheader }). Fonts are stored as
// names and resolved to embedded fonts by buildPdfSettings at draw time.
// The examples all render on a fixed 792x612 landscape page.
const PAGE_WIDTH = 792;
const PAGE_HEIGHT = 612;
const MARGIN = PAGE_WIDTH / 12;

const baseDefaults = () => ({
    Table: {
        tableType: 'vertical',
        startingX: MARGIN,
        startingY: PAGE_HEIGHT - 50,
        maxTableWidth: PAGE_WIDTH - MARGIN * 2,
        tableBorder: true,
        tableBorderThickness: 1,
        tableBorderColor: rgb(.56, .56, .56),
        dividedX: true,
        dividedY: true,
        dividedXColor: undefined,
        dividedYColor: undefined,
        dividedXThickness: 1,
        dividedYThickness: 1,
        continuationFont: 'TimesRoman',
        continuationTextX: undefined,
        continuationTextY: 10,
        continuationFontSize: 15,
        continuationFillerHeight: 20,
        continuationText: 'Continues on Next Page',
        appendedPageStartX: MARGIN,
        appendedPageStartY: PAGE_HEIGHT - 50,
        appendedMaxTableWidth: PAGE_WIDTH - MARGIN * 2,
    },
    Header: {
        headerHeight: undefined,
        headerBackgroundColor: rgb(.03, .03, .03),
        headerFont: 'TimesRomanBold',
        headerTextSize: 10,
        headerLineHeight: 12,
        headerTextAlignment: 'center',
        headerTextJustification: 'top',
        headerTextColor: undefined,
        headerDividedY: true,
        headerDividedYColor: rgb(.03, .03, .03),
        headerDividedYThickness: 0,
        headerDividedX: true,
        headerDividedXColor: undefined,
        headerDividedXThickness: 1,
        headerWrapText: true,
    },
    Row: {
        rowBackgroundColor: rgb(1, 1, 1),
        alternateRowColor: true,
        alternateRowColorValue: rgb(.21, .24, .85),
    },
    Cell: {
        cellFont: 'TimesRoman',
        cellTextSize: 10,
        cellLineHeight: 12,
        cellTextColor: undefined,
        cellPaddingX: 2,
        cellPaddingY: 1,
        additionalWrapCharacters: ['/'],
    },
    Subheader: {
        subHeadingColumns: [],
        subHeadingBackgroundColor: rgb(0, 0, 0),
        subHeadingHeight: 12,
        subHeadingFont: 'TimesRoman',
        subHeadingTextColor: rgb(0, 0, 0),
        subHeadingTextSize: 10,
        subHeadingLineHeight: 12,
        subHeadingDividedX: true,
        subHeadingDividedXThickness: 1,
        subHeadingDividedXColor: rgb(0, 0, 0),
        subHeadingDividedY: true,
        subHeadingDividedYThickness: 1,
        subHeadingDividedYColor: rgb(0, 0, 0),
        subHeadingWrapText: true,
    },
});

export const singlePageDefaults = () => baseDefaults();

export const multiPageDefaults = () => {
    const defaults = baseDefaults();
    defaults.Table.startingY = PAGE_HEIGHT - 20;
    defaults.Table.appendedPageStartY = PAGE_HEIGHT - 20;
    defaults.Table.continuationFillerHeight = 35;
    return defaults;
};

export const subheadingDefaults = () => {
    const defaults = baseDefaults();
    defaults.Subheader.subHeadingColumns = subheadingColumnDefs;
    defaults.Subheader.subHeadingBackgroundColor = rgb(.21, .24, .85);
    return defaults;
};
