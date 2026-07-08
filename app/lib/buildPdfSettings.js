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
        // tableStartingY/appendedTableStartingY are measured DOWN from the top of the page (0 = top edge)
        tableStartingX: num(Table.tableStartingX, 0),
        tableStartingY: num(Table.tableStartingY, 0),
        // tableMaxWidth left unset defers to the package default (page width minus
        // tableStartingX); the package also clamps an explicit value to the page edge
        tableMaxWidth: num(Table.tableMaxWidth),
        tableBorder: Table.tableBorder,
        tableBorderThickness: num(Table.tableBorderThickness, 1),
        tableBorderColor: Table.tableBorderColor,
        tableBorderRadius: num(Table.tableBorderRadius, 0),
        tableDividedX: Table.tableDividedX,
        tableDividedY: Table.tableDividedY,
        tableDividerXColor: Table.tableDividerXColor,
        tableDividerYColor: Table.tableDividerYColor,
        tableDividerXThickness: num(Table.tableDividerXThickness, 1),
        tableDividerYThickness: num(Table.tableDividerYThickness, 1),
        continuationFont: font(Table.continuationFont, 'TimesRoman'),
        continuationTextX: num(Table.continuationTextX),
        continuationTextY: num(Table.continuationTextY, 10),
        continuationFontSize: num(Table.continuationFontSize, 15),
        continuationFillerHeight: num(Table.continuationFillerHeight, 20),
        continuationText: Table.continuationText || 'Continues on Next Page',
        appendedTableStartingX: num(Table.appendedTableStartingX, num(Table.tableStartingX, 0)),
        appendedTableStartingY: num(Table.appendedTableStartingY, num(Table.tableStartingY, 0)),
        appendedTableMaxWidth: num(Table.appendedTableMaxWidth, num(Table.tableMaxWidth)),

        //HEADER
        headerHeight: num(Header.headerHeight),
        headerBackgroundColor: Header.headerBackgroundColor,
        headerFont: font(Header.headerFont, 'TimesRomanBold'),
        headerTextSize: num(Header.headerTextSize, 10),
        headerTextAlignment: Header.headerTextAlignment || 'center',
        headerTextJustification: Header.headerTextJustification || 'top',
        headerTextColor: Header.headerTextColor,
        headerDividedY: Header.headerDividedY,
        headerDividerYColor: Header.headerDividerYColor,
        headerDividerYThickness: num(Header.headerDividerYThickness, 1),
        headerDividedX: Header.headerDividedX,
        headerDividerXColor: Header.headerDividerXColor,
        headerDividerXThickness: num(Header.headerDividerXThickness, 1),
        headerWrapText: Header.headerWrapText !== false,

        //ROW
        rowBackgroundColor: Row.rowBackgroundColor,
        rowAlternateColor: Row.rowAlternateColor,
        rowAlternateColorValue: Row.rowAlternateColorValue,

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
        subHeadingDividerXThickness: num(Subheader.subHeadingDividerXThickness, 1),
        subHeadingDividerXColor: Subheader.subHeadingDividerXColor,
        subHeadingDividedY: Subheader.subHeadingDividedY,
        subHeadingDividerYThickness: num(Subheader.subHeadingDividerYThickness, 1),
        subHeadingDividerYColor: Subheader.subHeadingDividerYColor,
        subHeadingWrapText: Subheader.subHeadingWrapText !== false,
    };
}
