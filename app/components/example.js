'use client';

import { useState, useEffect, useMemo } from "react";
import { FormFieldsLayout, CopyCode, PdfPreview, BuyMeACoffee } from ".";

import { Doc, SinglePage, MultiPage, Subheading } from "../function";
import {Footer} from './';

const EXAMPLE_TYPES = {
    'Single Page': SinglePage,
    'Multi Page': MultiPage,
    'Subheadings': Subheading,
};

export function ExampleLayout({ }) {
    const [exampleName, setExampleName] = useState('Single Page');
    const [userPdfSettings, setUserPdfSettings] = useState(() => new SinglePage().defaultSettings);
    const [pdfUrl, setPdfUrl] = useState();
    const [drawError, setDrawError] = useState(null);

    // one example instance per selection - keeps its (random) data stable across redraws
    const example = useMemo(() => new EXAMPLE_TYPES[exampleName](), [exampleName]);

    useEffect(() => {
        //debounce: regenerating the PDF on every keystroke is wasteful and renders
        //transient values ("66" while typing "660"). cancelled guards against a
        //slow older draw overwriting a newer one
        let cancelled = false;
        const timeout = setTimeout(() => {
            const document = new Doc(example);
            document.draw({
                userPdfSettings,
                setPdfUrl: (url) => { if (!cancelled) setPdfUrl(url); },
            })
                .then(() => { if (!cancelled) setDrawError(null); })
                //keep showing the last good PDF; bad settings shouldn't crash the page
                .catch((error) => { if (!cancelled) setDrawError(error.message); });
        }, 300);

        return () => {
            cancelled = true;
            clearTimeout(timeout);
        };
    }, [userPdfSettings, example]);

    const handleExampleChange = (name) => {
        setExampleName(name);
        setUserPdfSettings(new EXAMPLE_TYPES[name]().defaultSettings); //reset form to the example's defaults
    };

    const examples = Object.keys(EXAMPLE_TYPES).map((name) => ({ name, current: name === exampleName }));

    return (
        <>
            <div className='grid grid-cols-1 lg:grid-cols-4 lg:grid-rows-1 lg:h-[calc(100vh-64px)] justify-center'>
                <div className='col-span-1 max-h-[45vh] lg:max-h-none lg:h-full scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-primary scrollbar-track-slate-300 scrollbar-w-2 overflow-y-auto overflow-x-hidden'>
                    <div className='sticky top-0 px-2 pt-5'>
                        <CopyCode
                            userPdfSettings={userPdfSettings}
                        />
                        <FormFieldsLayout
                            userPdfSettings={userPdfSettings}
                            setUserPdfSettings={setUserPdfSettings}
                            examples={examples}
                            onExampleChange={handleExampleChange}
                        />
                    </div>
                </div>
                <div className="col-span-1 lg:col-span-3 h-[65vh] lg:h-full">
                    <div className='flex flex-col h-full overflow-y-hidden'>
                        <div className="w-full pt-2 pb-0 px-2 h-full">
                            {
                                drawError &&
                                    <div className="alert alert-warning py-1 mb-2 text-sm">
                                        <span>These settings can&apos;t render: {drawError}</span>
                                    </div>
                            }
                            {
                                !pdfUrl ? <div className="skeleton w-full h-full"></div> : <PdfPreview url={pdfUrl}/>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className='h-fit'>
                <Footer/>
            </div>
        </>
    );
};
