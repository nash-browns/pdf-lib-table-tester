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
        pageOrientation: 'landscape', //tester-side: the page the table is drawn on
        tableStartingX: 0,
        tableStartingY: 0, //measured down from the top of the page (0 = top edge)
        tableMaxWidth: PAGE_WIDTH - MARGIN * 2,
        tableBorder: true,
        tableBorderThickness: 1,
        tableBorderColor: rgb(.56, .56, .56),
        tableBorderRadius: 0,
        tableDividedX: true,
        tableDividedY: true,
        tableDividerXColor: undefined,
        tableDividerYColor: undefined,
        tableDividerXThickness: 1,
        tableDividerYThickness: 1,
        continuationFont: 'TimesRoman',
        continuationTextX: 315,
        continuationTextY: 10,
        continuationFontSize: 15,
        continuationFillerHeight: 20,
        continuationText: 'Continues on Next Page',
        appendedTableStartingX: 0,
        appendedTableStartingY: 0,
        appendedTableMaxWidth: PAGE_WIDTH - MARGIN * 2,
    },
    Header: {
        headerHeight: 13,
        headerBackgroundColor: rgb(.03, .03, .03),
        headerFont: 'TimesRomanBold',
        headerTextSize: 10,
        headerTextAlignment: 'center',
        headerTextJustification: 'top',
        headerTextColor: undefined,
        headerDividedY: true,
        headerDividerYColor: rgb(.03, .03, .03),
        headerDividerYThickness: 1,
        headerDividedX: true,
        headerDividerXColor: undefined,
        headerDividerXThickness: 1,
        headerWrapText: true,
    },
    Row: {
        rowBackgroundColor: rgb(1, 1, 1),
        rowAlternateColor: true,
        rowAlternateColorValue: rgb(.21, .24, .85),
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
        subHeadingDividerXThickness: 1,
        subHeadingDividerXColor: rgb(0, 0, 0),
        subHeadingDividedY: true,
        subHeadingDividerYThickness: 1,
        subHeadingDividerYColor: rgb(0, 0, 0),
        subHeadingWrapText: true,
    },
});

export const singlePageDefaults = () => baseDefaults();

export const multiPageDefaults = () => {
    const defaults = baseDefaults();
    defaults.Table.tableStartingY = 0;
    defaults.Table.appendedTableStartingY = 0;
    defaults.Table.continuationFillerHeight = 35;
    return defaults;
};

export const subheadingDefaults = () => {
    const defaults = baseDefaults();
    defaults.Subheader.subHeadingColumns = subheadingColumnDefs;
    defaults.Subheader.subHeadingBackgroundColor = rgb(.21, .24, .85);
    return defaults;
};
