const tableDefs = {
  //PAID
  startingX: 'free',
  startingY: 'free',
  maxTableWidth: 'free',
  tableBorder: 'free',
  tableBorderThickness: 'free',
  tableBorderColor: 'free',
  alternateRowColor: 'free',
  alternateCellColor: 'free',
  dividedX: 'free',
  dividedY: 'free',
  dividedXColor: 'free',
  dividedYColor: 'free',
  dividedXThickness: 'free',
  dividedYThickness: 'free',
  //PAID
  continuationFont: 'paid',
  continuationTextX: 'paid',
  continuationTextY: 'paid',
  continuationFontSize: 'paid',
  continuationFillerHeight: 'paid',
  continuationText: 'paid',
  appendedPageStartX: 'paid',
  appendedPageStartY: 'paid',
  appendedMaxTableWidth: 'paid',
}


const headerDefs = {
  headerHeight: 'free',
  headerBackgroundColor: 'free',
  headerFont: 'free',
  headerTextSize: 'free',
  headerTextAlignment: 'free',
  headerTextJustification: 'free',
  headerTextColor: 'free',
  headerDividedY: 'free',
  headerDividedYColor: 'free',
  headerDividedXThicknesa: 'free',
  headerDividedX: 'free',
  headerDividedXColor: 'free',
  headerDividedYThickness: 'free',
}

const rowDefs = {
  rowBackgroundColor: 'free',
  alternateRowColor: 'free',
  alternateRowColorValue: 'free',
}

const cellDefs = {
  cellFont: 'paid',
  cellTextSize: 'free',
  cellLineHeight: 'free',
  cellTextColor: 'free',
}


const subheading = {
  subHeadingBackgroundColor: 'paid',
  subHeadingHeight: 'paid',
  subHeadingFont: 'paid',
  subHeadingTextColor: 'paid',
  subHeadingTextSize: 'paid',
  subHeadingLineHeight: 'paid',
  subHeadingDividedX: 'paid',
  subHeadingDividedXThickness: 'paid',
  subHeadingDividedXColor: 'paid',
  subHeadingDividedY: 'paid',
  subHeadingDividedYThickness: 'paid',
  subHeadingDividedYColor: 'paid',
}

export function getPaidFeatures() {
  const allSettings = {...tableDefs, ...headerDefs, ...rowDefs, ...cellDefs, ...subheading };
  
  const paidSettings = Object.keys(allSettings).filter(key => allSettings[key] === 'paid');


  return paidSettings;

}
