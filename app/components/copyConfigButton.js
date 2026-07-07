'use client';

import { useState } from "react";
import { ClipboardIcon } from "@heroicons/react/20/solid"

export function CopyConfigButton({ isStandard, userPdfSettings }) {
    const [coppied, setCoppied] = useState(false);

    return (
        <div 
            onMouseLeave={
                //allows animation to finish
                () => setTimeout(() => {
                    coppied && setCoppied(false)
                }, "250")
            } 
            className="tooltip tooltip-left h-8" data-tip={!coppied ? 'Copy Config' : 'Coppied!!'}
        >
            <button
                onClick={() => {setCoppied(!coppied); handleCopySettings(userPdfSettings)}}
                className={`btn btn-square btn-outline btn-sm ${!isStandard && 'btn-primary'}`}
            >
                <ClipboardIcon/>
            </button>
        </div>
    )
}

const handleCopySettings = (userPdfSettings) => {
    
    const {
        startingX,
        startingY,
        appendedPageStartX,
        appendedPageStartY,
        appendedMaxTableWidth,
        tableType,
        dividedX,
        dividedY,
        dividedXColor,
        dividedYColor,
        dividedXThickness,
        dividedYThickness,
        maxTableWidth,
        maxTableHeight,
        rowHeightSizing,
        tableBorder,
        tableBorderThickness,
        tableBorderColor,
        rounded,
        //CONTINUES
        continuesOnNextPage,
        continuationFiller,
        continuationTextX ,
        continuationTextY,
        continuationFont,
        continuationFontSize,
        continuationFillerHeight,
        continuationText,
    } = userPdfSettings.Table;
    
    const {
        headerFont,
        headerDividedX,
        headerDividedY,
        headerDividedXColor,
        headerDividedYColor,
        headerDividedXThickness,
        headerDividedYThickness,
        headerBackgroundColor,
        headerHeight,
        headerTextColor,
        headerTextSize,
        headerLineHeight,
        headerTextAlignment,
        headerTextJustification,
        headerWrapText,
    } = userPdfSettings.Header;
    
    const {
        rowBackgroundColor,
        alternateRowColor,
        alternateRowColorValue,
    } = userPdfSettings.Row;
    
    const {
        cellFont,
        cellTextSize,
        cellLineHeight,
        cellTextColor,
        additionalWrapCharacters,
    } = userPdfSettings.Cell;
    
    const {
        subHeadingBackgroundColor,
        subHeadingHeight,
        subHeadingFont,
        subHeadingTextColor,
        subHeadingTextSize,
    } = userPdfSettings.Subheader;

    console.log(additionalWrapCharacters)
    
    const settings = `
    /**
     * all possible lines are included for additional adjustment.
     * if the line is commented out, it matches the default value and is not needed for you config & can be deleted.
     * If using a standard license, pro lines will be included but commented out.
     * format for comments on each line -> Required/Optional - Default Value - note/comment/example.
    */
    await drawTable({
        //REQUIRED
        data,// Required - No Default - data to be printed
        page,// Required - No Default - page provided by pdf-lib
        pdfDoc,// Required - No Default - pdfDoc that the table will be printed on
        fonts,// Required - No Default - import { StandardFonts } from 'pdf-lib';
        columns,// Required - No Default - column definitions
        pageDimensions:[792.0, 612.0],// Required - No Default - landscape -> [792.0, 612.0], portrait -> [612.0, 792.0]
        
        //TABLE SETTINGS
        ${cl(0,startingX)}startingX:${startingX},// Optional - Default 0 - the starting x coordinate
        ${cl(612,startingY)}startingY:${startingY},// Optional - Default 612 - the starting y coordinate
        ${cl(100,appendedPageStartX)}appendedPageStartX:${appendedPageStartX},
        ${cl(512,appendedPageStartY)}appendedPageStartY:${appendedPageStartY},
        ${cl(500,appendedMaxTableWidth)}appendedMaxTableWidth:${appendedMaxTableWidth},
        ${cl('vertical',tableType)}tableType:${tableType},// Optional - 'vertical' - Options: vertical || horizontal || 2way TODO: horizontal || 2way not supported yet
        ${cl(true,dividedX)}dividedX:${dividedX},// Optional - true - sets if the table has x dividers
        ${cl(true,dividedY)}dividedY:${dividedY},// Optional - true - sets if the table has y dividers
        ${cl('rgb(0,0,0)',dividedXColor)}dividedXColor:${getColor(dividedXColor)},// Optional - rgb(0,0,0) - can pass in any pdf-lib rgb value
        ${cl('rgb(0,0,0)',dividedYColor)}dividedYColor:${getColor(dividedYColor)},// Optional - rgb(0,0,0) - can pass in any pdf-lib rgb value
        ${cl(1,dividedXThickness)}dividedXThickness:${dividedXThickness},// Optional - 1 - sets x divider thickness
        ${cl(1,dividedYThickness)}dividedYThickness:${dividedYThickness},// Optional - 1 - sets y divider thickness
        ${cl(false,maxTableWidth)}maxTableWidth:${maxTableWidth},// Optional - false - table is defaulted to page width but a max value can be passed
        ${cl(false,maxTableHeight)}maxTableHeight:${maxTableHeight},// Optional - false - table is defaulted to page height but a max value can be passed
        ${cl('auto',rowHeightSizing)}rowHeightSizing:${rowHeightSizing},// Optional - 'auto' //TODO: remove this.
        ${cl(true,tableBorder)}tableBorder:${tableBorder},// Optional - true - tables have a border by default but it can be removed by passing false
        ${cl(0,tableBorderThickness)}tableBorderThickness:${tableBorderThickness},// Optional - 1 - sets the thickness of the table border
        ${cl(0,tableBorderColor)}tableBorderColor:${getColor(tableBorderColor)},// Optional - rgb(0,0,0) - can pass in any pdf-lib rgb value
        ${cl(false,rounded)}rounded:${rounded},//TODO: add or remove this option. Currently not supported
        
        //CONTINUES
        ${cl(false,continuesOnNextPage)}continuesOnNextPage:${continuesOnNextPage},// Default false - can pass a function for what to draw //TODO: add this.
        continuationFiller:(page, continuesOnNextPage, continuationX, continuationY, continuationFont, continuationFontSize, continuationFillerHeight, continuationText) :> continuationSection(page, continuesOnNextPage, continuationX, continuationY, continuationFont, continuationFontSize, continuationFillerHeight, continuationText),
        ${cl('center',continuationTextX)}continuationTextX:${continuationTextX},// Text starting X
        ${cl(10,continuationTextY)}continuationTextY:${continuationTextY},//Text starting Y
        ${cl('TimesRoman',continuationFont.name)}continuationFont:${continuationFont.name},// Text font
        ${cl(15,continuationFontSize)}continuationFontSize:${continuationFontSize},// text font size
        ${cl(20,continuationFillerHeight)}continuationFillerHeight:${continuationFillerHeight},// this is the hight that will be left by the table
        ${cl('Continues on Next Page',continuationText)}continuationText:${continuationText},
        
        //SUB HEADINGS TODO: not supported yet
        ${cl('rgb(.03, .03, .03)',getColor(subHeadingBackgroundColor))}subHeadingBackgroundColor:${getColor(subHeadingBackgroundColor)},//TODO: Currently not supported
        ${cl(12,subHeadingHeight)}subHeadingHeight:${subHeadingHeight},//TODO: Currently not supported
        ${cl('TimesRoman',subHeadingFont.name)}subHeadingFont:${subHeadingFont.name},//TODO: Currently not supported
        ${cl('rgb(.03, .03, .03)',subHeadingTextColor)}subHeadingTextColor:${getColor(subHeadingTextColor)},//TODO: Currently not supported
        ${cl(0,subHeadingTextSize)}subHeadingTextSize:${subHeadingTextSize},//TODO: Currently not supported
          
        //HEADER SETTINGS
        ${cl('TimesRomanBold',headerFont.name)}headerFont:${headerFont.name},// Required -  No Default - any pdflib standard font
        ${cl(true,headerDividedX)}headerDividedX:${headerDividedX},// Default true - sets if the table header has x dividers
        ${cl(true,headerDividedY)}headerDividedY:${headerDividedY},// Default true - sets if the table header has y divider
        ${cl('rgb(0,0,0)',headerDividedXColor)}headerDividedXColor:${getColor(headerDividedXColor)}, // Default rgb(0,0,0) - can pass in any pdf-lib rgb value
        ${cl('rgb(0,0,0)',headerDividedYColor)}headerDividedYColor:${getColor(headerDividedYColor)},// Default rgb(0,0,0) - can pass in any pdf-lib rgb value
        ${cl(1,headerDividedXThickness)}headerDividedXThickness:${headerDividedXThickness},// Default 1 - sets the thickness of the table header x divider
        ${cl(1,headerDividedYThickness)}headerDividedYThickness:${headerDividedYThickness},// Default 1 - sets the thickness of the table header y divider
        ${cl('rgb(.03, .03, .03)',headerBackgroundColor)}headerBackgroundColor:${getColor(headerBackgroundColor)},                // Default - rgb(.03, .03, .03) - can pass in any pdf-lib rgb value
        ${cl(10,headerHeight)}headerHeight:${headerHeight},// Default 10 - height of the table header
        ${cl('rgb(0,0,0)',headerTextColor)} headerTextColor:${getColor(headerTextColor)},// Default rgb(0,0,0) - can pass in any pdf-lib rgb value
        ${cl(10,headerTextSize)}headerTextSize:${headerTextSize},// Default 10 - table header text size
        ${cl(10,headerLineHeight)}headerLineHeight:${headerLineHeight},
        ${cl('left',headerTextAlignment)}headerTextAlignment:${headerTextAlignment}, // Default 'left' - left/right/center 
        ${cl('top',headerTextJustification)}headerTextJustification:${headerTextJustification},// Default 'top' - top/center/bottom
        ${cl(false,headerWrapText)}headerWrapText:${headerWrapText},// Default false - allows text in the header to wrap
        
        //ROWSETTINGS
        ${cl('rgb(1, 1, 1) ',getColor(rowBackgroundColor))}rowBackgroundColor:${getColor(rowBackgroundColor)},//rgb(1, 1, 1) - can pass in any pdf-lib rgb value
        ${cl(true,alternateRowColor)}alternateRowColor:${alternateRowColor},// Default true - cell rows will alternate background color
        ${cl('rgb(.03, .03, .03)',getColor(alternateRowColorValue))}alternateRowColorValue:${getColor(alternateRowColorValue)},//rgb(.03, .03, .03) - can pass in any pdf-lib rgb value
        
        //CELL SETTINGS
        ${cl('TimesRoman',cellFont.name)}cellFont:${cellFont.name},// Required -  No Default - any pdflib standard font
        ${cl(10,cellTextSize)}cellTextSize:${cellTextSize},// Default 10 - cell text size
        ${cl(10,cellLineHeight)}cellLineHeight:${cellLineHeight},
        ${cl('rgb(0,0,0)',getColor(cellTextColor))}cellTextColor:${getColor(cellTextColor)},// Default rgb(0,0,0) - can pass in any pdf-lib rgb value
        ${additionalWrapCharacters.length < 1 ? '//' : ''}additionalWrapCharacters:'${additionalWrapCharacters.toString()}'
    })
    `;
    
    navigator.clipboard.writeText(settings);

};

const cl = (defaultValue, value) => {
    if(defaultValue === value) return '//';
    return '';
};


const getColor = (color) => {
    const prettyColor = color ? `rgb('${color.red}','${color.green}','${color.blue}')` : 'rgb(0,0,0)';
    return prettyColor;
};
