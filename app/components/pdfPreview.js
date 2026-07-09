'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowDownTrayIcon } from '@heroicons/react/20/solid';

//browsers render iframed PDFs inconsistently (Chrome embeds its dark viewer,
//iOS Safari shows a bare white first page) - so we render the PDF ourselves
//with pdf.js and style the viewer the same everywhere

let pdfjsPromise;
function getPdfjs() {
    if (!pdfjsPromise) {
        pdfjsPromise = import('pdfjs-dist').then((pdfjs) => {
            //served from /public (copied from node_modules/pdfjs-dist/build at install
            //time) - bundler-resolved worker URLs break under Next's webpack config
            pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
            return pdfjs;
        });
    }
    return pdfjsPromise;
}

export function PdfPreview({ url }) {
    const [doc, setDoc] = useState(null);
    const [pageAspect, setPageAspect] = useState(612 / 792);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;
        let loadingTask;

        (async () => {
            try {
                const pdfjs = await getPdfjs();
                if (cancelled) return;
                loadingTask = pdfjs.getDocument({ url });
                const loadedDoc = await loadingTask.promise;
                const page1 = await loadedDoc.getPage(1);
                const vp = page1.getViewport({ scale: 1 });
                if (cancelled) return;
                setPageAspect(vp.width / vp.height);
                setError(null);
                setDoc(loadedDoc);
            } catch (e) {
                //destroyed mid-load (url changed) is expected; report real failures
                if (!cancelled) setError(e.message);
            }
        })();

        return () => {
            cancelled = true;
            //destroying the loading task also frees the document and its worker memory
            loadingTask?.destroy();
            setDoc(null);
        };
    }, [url]);

    if (error) {
        return <div className="alert alert-warning text-sm">Could not render the PDF: {error}</div>;
    }

    return (
        <div className="relative h-full w-full rounded-md bg-[#38383d]">
            {/* toolbar, in the spirit of the desktop viewer */}
            <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-end gap-2 h-10 px-3 bg-[#323639] rounded-t-md text-gray-200 text-xs">
                {doc && <span className="select-none">{doc.numPages} page{doc.numPages === 1 ? '' : 's'}</span>}
                <a href={url} download="table.pdf" title="Download PDF" className="btn btn-ghost btn-xs text-gray-200">
                    <ArrowDownTrayIcon className="h-4 w-4" />
                </a>
            </div>
            <div className="h-full w-full overflow-y-auto pt-12 pb-4 px-4 sm:px-8">
                {!doc ? (
                    <div className="skeleton w-full h-4/5 opacity-20"></div>
                ) : (
                    Array.from({ length: doc.numPages }, (_, i) => (
                        <PdfPage key={i + 1} doc={doc} pageNumber={i + 1} aspect={pageAspect} />
                    ))
                )}
            </div>
        </div>
    );
}

//pages render lazily as they scroll into view - the multi-page examples can be
//a hundred-plus pages, and rendering them all up front would hang the tab
function PdfPage({ doc, pageNumber, aspect }) {
    const wrapRef = useRef(null);
    const canvasRef = useRef(null);
    const [visible, setVisible] = useState(pageNumber === 1);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setVisible(entry.isIntersecting),
            { rootMargin: '600px 0px' }
        );
        observer.observe(wrapRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!visible || !doc) return;
        let cancelled = false;

        (async () => {
            try {
                const page = await doc.getPage(pageNumber);
                if (cancelled || !wrapRef.current || !canvasRef.current) return;

                const width = wrapRef.current.clientWidth;
                const dpr = Math.min(window.devicePixelRatio || 1, 2);
                const viewport = page.getViewport({ scale: (width / page.getViewport({ scale: 1 }).width) * dpr });

                const canvas = canvasRef.current;
                canvas.width = viewport.width;
                canvas.height = viewport.height;
                await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
            } catch (e) {
                //a render aborted by unmount/doc swap is expected noise
            }
        })();

        return () => { cancelled = true; };
    }, [visible, doc, pageNumber]);

    return (
        <div ref={wrapRef} className="mx-auto mb-4 w-full max-w-3xl bg-white shadow-lg" style={{ aspectRatio: `${aspect}` }}>
            <canvas ref={canvasRef} className="h-full w-full" />
        </div>
    );
}
