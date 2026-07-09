import { rgb } from 'pdf-lib';
// import { useState } from 'react';
// import { StandardField, MultiSelect } from "./";

const colorOptions = [
  { id: 1, name: 'Grey', value: rgb(.56, .56, .56) },
  { id: 2, name: 'White', value: rgb(1, 1, 1) },
  { id: 3, name: 'Blue', value: rgb(.23, .25, .96) },
  { id: 4, name: 'Red', value: rgb(.90, .05, .09) },
  { id: 5, name: 'Yellow', value: rgb(.90, .81, .05) },
  { id: 6, name: 'Orange', value: rgb(.90, .56, .11) },
  { id: 7, name: 'Green', value: rgb(.28, .90, .11) },
  { id: 8, name: 'Purple', value: rgb(.83, .11, .90) },
  { id: 9, name: 'Black', value: rgb(0, 0, 0)}, //TODO: idk why this does not work
]

const fontOptions = [
  { id: 1, name: 'Courier', value: 'Courier'},
  { id: 2, name: 'CourierBold', value: 'CourierBold'},
  { id: 3, name: 'CourierBoldOblique', value: 'CourierBoldOblique'},
  { id: 4, name: 'CourierOblique', value: 'CourierOblique'},
  { id: 5, name: 'Helvetica', value: 'Helvetica'},
  { id: 6, name: 'HelveticaBold', value: 'HelveticaBold'},
  { id: 7, name: 'HelveticaBoldOblique', value: 'HelveticaBoldOblique'},
  { id: 8, name: 'HelveticaOblique', value: 'HelveticaOblique'},
  { id: 9, name: 'TimesRoman', value: 'TimesRoman'},
  { id: 10, name: 'TimesRomanBold', value: 'TimesRomanBold'},
  { id: 11, name: 'TimesRomanBoldItalic', value: 'TimesRomanBoldItalic'},
  { id: 12, name: 'TimesRomanItalic', value: 'TimesRomanItalic'},
]

const trueFalse = [
  { id: 1, name: 'True', value: true },
  { id: 2, name: 'False', value: false },
]

const tableDefs = {
  pageOrientation: {type: 'string', options: [{ id: 1, name: 'Landscape', value: 'landscape' }, { id: 2, name: 'Portrait', value: 'portrait' }], defaultOption: 0},
  tableStartingX: {type: 'number'},
  tableStartingY: {type: 'number'},
  tableMaxWidth: {type: 'number'},
  tableBorder: {type: 'string', options: trueFalse, defaultOption: 0}, 
  tableBorderThickness: {type: 'number'}, 
  tableBorderColor:  {type: 'string', options: colorOptions, defaultOption: 0},
  tableBorderRadius: {type: 'number'},
  rowAlternateColor: {type: 'string', options: trueFalse, defaultOption: 0},
  alternateCellColor: {type: 'string', options: colorOptions, defaultOption: 0},

  tableDividedX: {type: 'string', options: trueFalse, defaultOption: 0},
  tableDividedY: {type: 'string', options: trueFalse, defaultOption: 0},
  tableDividerXColor:  {type: 'string', options: colorOptions, defaultOption: 0},
  tableDividerYColor:  {type: 'string', options: colorOptions, defaultOption: 0},
  tableDividerXThickness: {type: 'number'},
  tableDividerYThickness: {type: 'number'},

  continuationFont: {type: 'string', options: fontOptions, defaultOption: 0}, // Text font
  continuationTextX: {type: 'number'}, // Text starting X
  continuationTextY: {type: 'number'}, //Text starting Y
  continuationFontSize: {type: 'number'}, // text font size
  continuationFillerHeight: {type: 'number'}, // vertical space reserved below the table for the continuation footer
  continuationText: {type: 'text'},

  appendedTableStartingX: {type: 'number'},
  appendedTableStartingY: {type: 'number'},
  appendedTableMaxWidth: {type: 'number'},
}

const headerDefs = {
  headerHeight: {type: 'number'},
  headerBackgroundColor: {type: 'string', options: colorOptions, defaultOption: 0},
  
  headerFont: {type: 'string', options: fontOptions, defaultOption: 0},
  headerTextSize: {type: 'number'},
  headerTextAlignment: {type: 'string', options: [{ id: 1, name: 'Left', value: 'left' }, { id: 2, name: 'Center', value: 'center' }, { id: 3, name: 'Right', value: 'right' }], defaultOption: 0},
  headerTextJustification: {type: 'string', options: [{ id: 1, name: 'Top', value: 'top' }, { id: 2, name: 'Center', value: 'center' }, { id: 3, name: 'Bottom', value: 'bottom' }], defaultOption: 0},
  headerTextColor: {type: 'string', options: colorOptions, defaultOption: 0},
  
  headerDividedY: {type: 'string', options: trueFalse, defaultOption: 0},
  headerDividerYColor: {type: 'string', options: colorOptions, defaultOption: 0},
  headerDividerYThickness: {type: 'number'},

  headerDividedX: {type: 'string', options: trueFalse, defaultOption: 0},
  headerDividerXColor: {type: 'string', options: colorOptions, defaultOption: 0},
  headerDividerXThickness: {type: 'number'},
  
  //headerWrapText: {type: 'string', options: trueFalse, defaultOption: 0},
}

const rowDefs = {
  rowBackgroundColor: {type: 'string', options: colorOptions, defaultOption: 1},
  rowAlternateColor: {type: 'string', options: trueFalse, defaultOption: 0},
  rowAlternateColorValue: {type: 'string', options: colorOptions, defaultOption: 2},
}

const cellDefs = {
  cellFont: {type: 'string', options: fontOptions, defaultOption: 8}, //Required
  cellTextSize: {type: 'number'},
  cellLineHeight: {type: 'number'},
  cellTextColor: {type: 'string', options: colorOptions, defaultOption: 8},
  cellPaddingX: {type: 'number'},
  cellPaddingY: {type: 'number'},
  //additionalWrapCharacters,
  //cellBackgroundColor: {type: 'string', options: colorOptions, defaultOption: 0},
  // cellPaddingBottom: {type: 'number'},
}

const subheading = {
  subHeadingBackgroundColor: {type: 'string', options: colorOptions, defaultOption: 2},
  subHeadingHeight: {type: 'number'},
  subHeadingFont: {type: 'string', options: fontOptions, defaultOption: 8},
  subHeadingTextColor: {type: 'string', options: colorOptions, defaultOption: 8},
  subHeadingTextSize: {type: 'number'},
  subHeadingLineHeight: {type: 'number'},
  subHeadingDividedX: {type: 'string', options: trueFalse, defaultOption: 0},
  subHeadingDividerXThickness: {type: 'number'},
  subHeadingDividerXColor: {type: 'string', options: colorOptions, defaultOption: 8},
  subHeadingDividedY: {type: 'string', options: trueFalse, defaultOption: 0},
  subHeadingDividerYThickness: {type: 'number'},
  subHeadingDividerYColor: {type: 'string', options: colorOptions, defaultOption: 8},
}

export const fieldDefs = {
  ...tableDefs,
  ...headerDefs,
  ...rowDefs,
  ...cellDefs,
  ...subheading
};
  
