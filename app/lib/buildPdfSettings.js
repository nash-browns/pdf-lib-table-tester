// Translates the sectioned form state ({ Table, Header, Row, Cell, Subheader },
// fonts as names, numbers possibly as strings from inputs) into the flat options
// object createPDFTables expects. This is the ONLY place that mapping happens.

// '' / null / undefined mean "not set" -> fallback (undefined lets the package default apply).
// 0 is a real value and is preserved.
const num = (value, fallback = undefined) => {
    if (value === '' || value === null || value === undefined) return fallback;
    const n = Number(value);
    return Number.isFinite(n) ? n : fallback;
};

export function buildPdfSettings({ settings, page, fontLookup }) {
    const { Table = {}, Header = {}, Row = {}, Cell = {}, Subheader = {} } = settings;
    const font = (name, fallbackName) => fontLookup[name] ?? fontLookup[fallbackName];

    return {
        //TABLE
        tableType: Table.tableType || 'vertical',
        startingX: num(Table.startingX, 0),
        startingY: num(Table.startingY, page.getHeight()),
        maxTableWidth: num(Table.maxTableWidth, page.getWidth()),
        tableBorder: Table.tableBorder,
        tableBorderThickness: num(Table.tableBorderThickness, 1),
        tableBorderColor: Table.tableBorderColor,
        dividedX: Table.dividedX,
        dividedY: Table.dividedY,
        dividedXColor: Table.dividedXColor,
        dividedYColor: Table.dividedYColor,
        dividedXThickness: num(Table.dividedXThickness, 1),
        dividedYThickness: num(Table.dividedYThickness, 1),
        continuationFont: font(Table.continuationFont, 'TimesRoman'),
        continuationTextX: num(Table.continuationTextX),
        continuationTextY: num(Table.continuationTextY, 10),
        continuationFontSize: num(Table.continuationFontSize, 15),
        continuationFillerHeight: num(Table.continuationFillerHeight, 20),
        continuationText: Table.continuationText || 'Continues on Next Page',
        appendedPageStartX: num(Table.appendedPageStartX, num(Table.startingX, 0)),
        appendedPageStartY: num(Table.appendedPageStartY, num(Table.startingY, page.getHeight())),
        appendedMaxTableWidth: num(Table.appendedMaxTableWidth, num(Table.maxTableWidth, page.getWidth())),

        //HEADER
        headerHeight: num(Header.headerHeight),
        headerBackgroundColor: Header.headerBackgroundColor,
        headerFont: font(Header.headerFont, 'TimesRomanBold'),
        headerTextSize: num(Header.headerTextSize, 10),
        headerLineHeight: num(Header.headerLineHeight, num(Header.headerTextSize, 10) * 1.2),
        headerTextAlignment: Header.headerTextAlignment || 'center',
        headerTextJustification: Header.headerTextJustification || 'top',
        headerTextColor: Header.headerTextColor,
        headerDividedY: Header.headerDividedY,
        headerDividedYColor: Header.headerDividedYColor,
        headerDividedYThickness: num(Header.headerDividedYThickness, 1),
        headerDividedX: Header.headerDividedX,
        headerDividedXColor: Header.headerDividedXColor,
        headerDividedXThickness: num(Header.headerDividedXThickness, 1),
        headerWrapText: Header.headerWrapText !== false,

        //ROW
        rowBackgroundColor: Row.rowBackgroundColor,
        alternateRowColor: Row.alternateRowColor,
        alternateRowColorValue: Row.alternateRowColorValue,

        //CELL
        cellFont: font(Cell.cellFont, 'TimesRoman'),
        cellTextSize: num(Cell.cellTextSize, 10),
        cellLineHeight: num(Cell.cellLineHeight, num(Cell.cellTextSize, 10)),
        cellTextColor: Cell.cellTextColor,
        cellPaddingX: num(Cell.cellPaddingX, 2),
        cellPaddingY: num(Cell.cellPaddingY, 1),
        additionalWrapCharacters: Cell.additionalWrapCharacters,

        //SUBHEADING
        subHeadingColumns: Subheader.subHeadingColumns || [],
        subHeadingBackgroundColor: Subheader.subHeadingBackgroundColor,
        subHeadingHeight: num(Subheader.subHeadingHeight, 12),
        subHeadingFont: font(Subheader.subHeadingFont, 'TimesRoman'),
        subHeadingTextColor: Subheader.subHeadingTextColor,
        subHeadingTextSize: num(Subheader.subHeadingTextSize, 10),
        subHeadingLineHeight: num(Subheader.subHeadingLineHeight, 10),
        subHeadingDividedX: Subheader.subHeadingDividedX,
        subHeadingDividedXThickness: num(Subheader.subHeadingDividedXThickness, 1),
        subHeadingDividedXColor: Subheader.subHeadingDividedXColor,
        subHeadingDividedY: Subheader.subHeadingDividedY,
        subHeadingDividedYThickness: num(Subheader.subHeadingDividedYThickness, 1),
        subHeadingDividedYColor: Subheader.subHeadingDividedYColor,
        subHeadingWrapText: Subheader.subHeadingWrapText !== false,
    };
}
