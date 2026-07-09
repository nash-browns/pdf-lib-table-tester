'use client';

import { useState } from "react";
import { ClipboardIcon } from "@heroicons/react/20/solid"

export function CopyConfigButton({ userPdfSettings }) {
    const [copied, setCopied] = useState(false);

    return (
        <div
            onMouseLeave={
                //allows animation to finish
                () => setTimeout(() => {
                    copied && setCopied(false)
                }, "250")
            }
            className="tooltip tooltip-left h-8" data-tip={!copied ? 'Copy Config' : 'Copied!'}
        >
            <button
                onClick={() => {setCopied(!copied); handleCopySettings(userPdfSettings)}}
                className='btn btn-square btn-outline btn-sm btn-primary'
            >
                <ClipboardIcon/>
            </button>
        </div>
    )
}

// ---------- formatting helpers ----------

const isUnset = (v) => v === undefined || v === null || v === '';

const asNumber = (v) => {
    if (isUnset(v)) return undefined;
    const n = Number(v);
    return Number.isFinite(n) ? n : undefined;
};

const round3 = (n) => Math.round(n * 1000) / 1000;

const fmtValue = (v) => {
    if (v && typeof v === 'object' && 'red' in v) return `rgb(${round3(v.red)}, ${round3(v.green)}, ${round3(v.blue)})`;
    if (typeof v === 'string') return `'${v}'`;
    return String(v);
};

const sameValue = (a, b) => JSON.stringify(a) === JSON.stringify(b);

//one option line. commented out when the value is unset or matches the default -
//those lines are informational and can be deleted from the copied config
const opt = (key, value, def, comment = '') => {
    const c = comment ? ` // ${comment}` : '';
    if (isUnset(value)) {
        const shown = def === undefined ? 'undefined' : fmtValue(def);
        return `    // ${key}: ${shown},${c}`;
    }
    if (def !== undefined && sameValue(value, def)) return `    // ${key}: ${fmtValue(value)},${c}`;
    return `    ${key}: ${fmtValue(value)},${c}`;
};

//font options reference the embedded font variables generated above the call
const fontVar = (name) => name ? name.charAt(0).toLowerCase() + name.slice(1) : 'timesRoman';

// ---------- clipboard payload ----------

export const handleCopySettings = (userPdfSettings) => {
    const T = userPdfSettings.Table ?? {};
    const H = userPdfSettings.Header ?? {};
    const R = userPdfSettings.Row ?? {};
    const C = userPdfSettings.Cell ?? {};
    const S = userPdfSettings.Subheader ?? {};

    const fontNames = [...new Set([
        H.headerFont || 'TimesRomanBold',
        C.cellFont || 'TimesRoman',
        T.continuationFont || 'TimesRoman',
        S.subHeadingFont || 'TimesRoman',
    ])];
    const embeds = fontNames
        .map((name) => `const ${fontVar(name)} = await pdfDoc.embedFont(StandardFonts.${name});`)
        .join('\n');

    const subHeadingColumns = S.subHeadingColumns ?? [];
    const subHeadingColumnLines = subHeadingColumns.length
        ? `const subHeadingColumns = [\n${subHeadingColumns.map((d) => `    { columnId: '${d.columnId}', parentId: '${d.parentId}' },`).join('\n')}\n];\n\n`
        : '';

    const lines = [
        '    //TABLE',
        opt('tableStartingX', asNumber(T.tableStartingX), 0, 'left edge, from the left of the page'),
        opt('tableStartingY', asNumber(T.tableStartingY), 0, 'top edge, measured DOWN from the top of the page'),
        opt('tableMaxWidth', asNumber(T.tableMaxWidth), undefined, 'defaults to page width - tableStartingX; clamped to the page edge'),
        opt('appendedTableStartingX', asNumber(T.appendedTableStartingX), asNumber(T.tableStartingX) ?? 0, 'pages 2+; defaults to tableStartingX'),
        opt('appendedTableStartingY', asNumber(T.appendedTableStartingY), asNumber(T.tableStartingY) ?? 0, 'pages 2+; defaults to tableStartingY'),
        opt('appendedTableMaxWidth', asNumber(T.appendedTableMaxWidth), asNumber(T.tableMaxWidth), 'pages 2+; defaults to tableMaxWidth'),
        opt('tableBorder', T.tableBorder, true),
        opt('tableBorderThickness', asNumber(T.tableBorderThickness), 1),
        opt('tableBorderColor', T.tableBorderColor, undefined, 'default black'),
        opt('tableBorderRadius', asNumber(T.tableBorderRadius), 0, 'rounded table corners'),
        opt('tableDividedX', T.tableDividedX, true, 'horizontal dividers between rows'),
        opt('tableDividedY', T.tableDividedY, true, 'vertical dividers between columns'),
        opt('tableDividerXColor', T.tableDividerXColor, undefined, 'default black'),
        opt('tableDividerYColor', T.tableDividerYColor, undefined, 'default black'),
        opt('tableDividerXThickness', asNumber(T.tableDividerXThickness), 1),
        opt('tableDividerYThickness', asNumber(T.tableDividerYThickness), 1),
        '',
        '    //CONTINUATION FOOTER',
        `    continuationFont: ${fontVar(T.continuationFont || 'TimesRoman')},`,
        opt('continuationText', T.continuationText, 'Continues on Next Page'),
        opt('continuationFontSize', asNumber(T.continuationFontSize), 15),
        opt('continuationTextX', asNumber(T.continuationTextX), undefined, 'defaults to centered'),
        opt('continuationTextY', asNumber(T.continuationTextY), 10),
        opt('continuationFillerHeight', asNumber(T.continuationFillerHeight), 20, 'space reserved below the table for the footer'),
        '',
        '    //HEADER',
        `    headerFont: ${fontVar(H.headerFont || 'TimesRomanBold')}, // Required`,
        opt('headerTextSize', asNumber(H.headerTextSize), 12),
        opt('headerTextColor', H.headerTextColor, undefined, 'default black'),
        opt('headerBackgroundColor', H.headerBackgroundColor, undefined, 'drawn at 25% opacity'),
        opt('headerHeight', asNumber(H.headerHeight), undefined, 'minimum height; the header grows to fit wrapped text'),
        opt('headerWrapText', H.headerWrapText, true),
        opt('headerTextAlignment', H.headerTextAlignment, 'left', "'left' | 'center' | 'right'"),
        opt('headerTextJustification', H.headerTextJustification, 'center', "'top' | 'center' | 'bottom'"),
        opt('headerDividedX', H.headerDividedX, true, 'line under the header'),
        opt('headerDividedY', H.headerDividedY, true, 'dividers between header cells'),
        opt('headerDividerXColor', H.headerDividerXColor, undefined, 'default black'),
        opt('headerDividerYColor', H.headerDividerYColor, undefined, 'default black'),
        opt('headerDividerXThickness', asNumber(H.headerDividerXThickness), 1),
        opt('headerDividerYThickness', asNumber(H.headerDividerYThickness), 1),
        '',
        '    //ROWS',
        opt('rowBackgroundColor', R.rowBackgroundColor, undefined, 'drawn at 25% opacity'),
        opt('rowAlternateColor', R.rowAlternateColor, false, 'alternate the background of every other row'),
        opt('rowAlternateColorValue', R.rowAlternateColorValue, undefined),
        '',
        '    //CELLS',
        `    cellFont: ${fontVar(C.cellFont || 'TimesRoman')}, // Required`,
        opt('cellTextSize', asNumber(C.cellTextSize), 10),
        opt('cellLineHeight', asNumber(C.cellLineHeight), asNumber(C.cellTextSize) ?? 10, 'defaults to cellTextSize; drives row height'),
        opt('cellTextColor', C.cellTextColor, undefined, 'default black'),
        opt('cellPaddingX', asNumber(C.cellPaddingX), 2),
        opt('cellPaddingY', asNumber(C.cellPaddingY), 1),
        opt('additionalWrapCharacters', isUnset(C.additionalWrapCharacters) || C.additionalWrapCharacters.length === 0 ? undefined : `${C.additionalWrapCharacters}`, undefined, "extra characters text may wrap on, e.g. ['-']"),
    ];

    if (subHeadingColumns.length) {
        lines.push(
            '',
            '    //SUBHEADINGS',
            '    subHeadingColumns,',
            `    subHeadingFont: ${fontVar(S.subHeadingFont || 'TimesRoman')}, // Required`,
            opt('subHeadingTextSize', asNumber(S.subHeadingTextSize), 10),
            opt('subHeadingLineHeight', asNumber(S.subHeadingLineHeight), asNumber(S.subHeadingTextSize) ?? 10, 'defaults to subHeadingTextSize'),
            opt('subHeadingHeight', asNumber(S.subHeadingHeight), undefined, 'minimum row height; the row grows to fit wrapped text'),
            opt('subHeadingTextColor', S.subHeadingTextColor, undefined, 'defaults to cellTextColor'),
            opt('subHeadingBackgroundColor', S.subHeadingBackgroundColor, undefined, 'drawn at 25% opacity'),
            opt('subHeadingWrapText', S.subHeadingWrapText, false),
            opt('subHeadingDividedX', S.subHeadingDividedX, false, 'line under subheading rows'),
            opt('subHeadingDividerXColor', S.subHeadingDividerXColor, undefined, 'default black'),
            opt('subHeadingDividerXThickness', asNumber(S.subHeadingDividerXThickness), 1),
            opt('subHeadingDividedY', S.subHeadingDividedY, undefined, 'defaults to tableDividedY'),
            opt('subHeadingDividerYColor', S.subHeadingDividerYColor, undefined, 'defaults to tableDividerYColor'),
            opt('subHeadingDividerYThickness', asNumber(S.subHeadingDividerYThickness), undefined, 'defaults to tableDividerYThickness'),
        );
    } else {
        lines.push(
            '',
            "    //SUBHEADINGS - see https://www.pdf-lib-table.com/documentation",
            `    subHeadingFont: ${fontVar(S.subHeadingFont || 'TimesRoman')}, // Required`,
        );
    }

    const settings = `/**
 * generated at pdf-lib-table.com
 * commented options match their default (or are unset) - keep or delete them
 */
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { createPDFTables } from 'pdf-lib-table';

const pdfDoc = await PDFDocument.create();
const page = pdfDoc.addPage([${T.pageOrientation === 'portrait' ? '612, 792' : '792, 612'}]); // appended pages inherit this size

${embeds}

// columnId keys into each row's data object
const columns = [
    // { columnId: 'serial', header: 'Serial' },
];

// each entry is { type: 'row' | 'subheading', data: {...} }
const data = [
    // { type: 'row', data: { serial: '0-646-50584-X' } },
];

${subHeadingColumnLines}const document = await createPDFTables(data, page, pdfDoc, columns, StandardFonts, rgb, {
${lines.join('\n')}
});

document.drawVerticalTables();

const pdfBytes = await pdfDoc.save();
`;

    navigator.clipboard.writeText(settings);
};
