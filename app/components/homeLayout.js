'use client';

import Image from 'next/image'
import Link from 'next/link';

import {Footer} from './';
import { useIntersectionObserver } from '../hooks';

export default function HomeLayout() {
  
  return (
        <div className="flex flex-col bg-base-100 overflow-x-clip">
            <Hero/>
            <div className='px-4 sm:px-12'>
                <ProductHighlights/>
                <InstallNow/>
            </div>
            <Footer/>
        </div>
  );
};

function Hero() {
    return (
        <div className="hero min-h-screen bg-base-100 text-gray-500">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <Image
                    src="/hero.svg"
                    width={500}
                    height={500}
                    className="w-full max-w-[500px] h-auto"
                    alt="Illustration of a PDF table"
                />
                <div>
                    <h1 className="text-5xl font-bold">The King of PDF Table Generation</h1>
                    <p className="py-6">I created this library because generating PDF tables is hard. Anything beyond the most basic example is usually unsupported. This library aims to solve that.</p>
                    <Link href='/documentation'><button className="btn btn-primary">Get Started</button></Link>
                </div>
            </div>
        </div>
    )
}

function ProductHighlights() {
    const { isIntersecting: squareIsIntersecting, ref: squareRef } = useIntersectionObserver({
        threshold: 1,
    })
    
    const { isIntersecting: easyToUseIsIntersecting, ref: easyToUseRef } = useIntersectionObserver({
        threshold: 0.5,
    })
    
    const { isIntersecting: pageBreakIsIntersecting, ref: pageBreakRef } = useIntersectionObserver({
        threshold: 0.5,
    })
    
    const { isIntersecting: lightweightIsIntersecting, ref: lightweightRef } = useIntersectionObserver({
        threshold: 0.5,
    })
    
    const { isIntersecting: parameterIsIntersecting, ref: parameterRef } = useIntersectionObserver({
        threshold: 0.5,
    })


    return (
        <div className='flex flex-col mb-80 items-center justify-center'>
            <div className='relative flex h-fit'>
                <ProductText
                    easyToUseRef={easyToUseRef}
                    pageBreakRef={pageBreakRef}
                    lightweightRef={lightweightRef}
                    parameterRef={parameterRef}
                />
                <ProductSquare 
                    refs={squareRef}
                    squareIsIntersecting={squareIsIntersecting}
                    easyToUseIsIntersecting={easyToUseIsIntersecting}
                    pageBreakIsIntersecting={pageBreakIsIntersecting}
                    lightweightIsIntersecting={lightweightIsIntersecting}
                    parameterIsIntersecting={parameterIsIntersecting}
                />
            </div>
        </div>
    )
}

function ProductText({easyToUseRef, pageBreakRef, lightweightRef, parameterRef}) {
    return (
        <div className='flex flex-col bg-base-100 text-gray-500'>
            <div ref={easyToUseRef} className='flex justify-start h-screen items-center text-gray-500'>
                <div className='w-full lg:w-1/2'>
                    <h1 className="text-5xl font-bold">Easy to use</h1>
                    <p className="py-6">Install the library, import the create table function, then print!</p>
                </div>
            </div>
            <div ref={pageBreakRef} className='flex justify-start h-screen items-center text-gray-500'>
                <div className='w-full lg:w-1/2'>
                    <h1 className="text-5xl font-bold">Handle Page Breaks with Ease</h1>
                    <p className="py-6">Pages can start with or without headers, and table dimensions are returned, facilitating dynamic footers to fill space.</p>
                </div>
            </div>
            <div ref={lightweightRef} className='flex justify-start h-screen items-center text-gray-500'>
                <div className='w-full lg:w-1/2'>
                    <h1 className="text-5xl font-bold">Lightweight & Performant</h1>
                    <p className="py-6">pdf-lib-table has no dependencies beyond pdf-lib and can print hundreds of pages with ease.</p>
                </div>
            </div>
            <div ref={parameterRef} className='flex justify-start h-screen items-center text-gray-500'>
                <div className='w-full lg:w-1/2'>
                    <h1 className="text-5xl font-bold">Over 50 parameters</h1>
                    <p className="py-6">Easy to get going, but enough customization to grow with your project</p>
                </div>
            </div>
        </div>
    )
}

function ProductSquare({refs, squareIsIntersecting, easyToUseIsIntersecting, pageBreakIsIntersecting, lightweightIsIntersecting, parameterIsIntersecting}) {
    return (
        <div ref={refs} className={`hidden lg:block sticky top-[calc(100vh/2-300px)] right-0 h-fit w-fit transform transition-all ease-in-out duration-200 ${easyToUseIsIntersecting | pageBreakIsIntersecting | lightweightIsIntersecting | parameterIsIntersecting ? 'opacity-100' : 'opacity-0 translate-x-32'}`}>
            <div className="card w-full min-w-[600px] h-full bg-base-200 text-primary-content">
                <div className="card-body">
                    <div className='grid grid-cols-1 grid-rows-1'>
                        <EasyToUse easyToUseIsIntersecting={easyToUseIsIntersecting}/>
                        <PageBreak pageBreakIsIntersecting={pageBreakIsIntersecting}/>
                        <LightWeight lightweightIsIntersecting={lightweightIsIntersecting}/>
                        <Parameters parameterIsIntersecting={parameterIsIntersecting}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

function EasyToUse({easyToUseIsIntersecting}) {
    return (
        <div className={`mockup-code transition-opacity ease-in duration-200 col-start-1 col-end-1 row-start-1 row-end-1 ${easyToUseIsIntersecting ? 'opacity-100' : 'opacity-0'}`}>
            <pre data-prefix="1"><code>{`import { createPDFTables } from 'pdf-lib-table';`}</code></pre> 
            <pre data-prefix="2"><code></code></pre> 
            <pre data-prefix="3"><code>{`//TABLE SETTINGS`}</code></pre> 
            <pre data-prefix="4"><code>{`const pdfSettings = {`}</code></pre> 
            <pre data-prefix="5"><code>{`     tableStartingX: 50,`}</code></pre>
            <pre data-prefix="6"><code>{`     tableStartingY: 50,`}</code></pre>
            <pre data-prefix="7"><code>{`     headerFont: timesRomanBold,`}</code></pre>
            <pre data-prefix="8"><code>{`     cellFont: timesRoman,`}</code></pre>
            <pre data-prefix="9"><code>{`};`}</code></pre>
            <pre data-prefix="10"><code></code></pre>
            <pre data-prefix="11"><code>{`const document = await createPDFTables(`}</code></pre>
            <pre data-prefix="12"><code>     data,</code></pre>
            <pre data-prefix="13"><code>     page,</code></pre>
            <pre data-prefix="14"><code>     pdfDoc,</code></pre>
            <pre data-prefix="15"><code>     columns,</code></pre>
            <pre data-prefix="16"><code>     StandardFonts,</code></pre>
            <pre data-prefix="17"><code>     rgb,</code></pre>
            <pre data-prefix="18"><code>     pdfSettings,</code></pre>
            <pre data-prefix="19"><code>{`);`}</code></pre>
            <pre data-prefix="20"><code></code></pre>
            <pre data-prefix="21"><code></code></pre>
            <pre data-prefix="22"><code>{`document.drawVerticalTables();`}</code></pre>
        </div>
    )
}

function PageBreak({pageBreakIsIntersecting}) {
    return (
        <div className={`relative flex justify-center items-center h-full w-full bg-gray-800 rounded-md overflow-hidden transition-opacity ease-in duration-200 col-start-1 col-end-1 row-start-1 row-end-1 ${pageBreakIsIntersecting ? 'opacity-100' : 'opacity-0'}`}>
            <Image
                src="/continues-on-next-page.svg"
                alt="A table continuing onto the next page"
                fill='true'
            />
        </div>
    
    )
}

function LightWeight({lightweightIsIntersecting}) {
    return (
        <div className={`flex justify-center items-center h-full w-full bg-gray-800 rounded-md transition-opacity ease-in duration-200 col-start-1 col-end-1 row-start-1 row-end-1 ${lightweightIsIntersecting ? 'opacity-100' : 'opacity-0'}`}>
            <Image
                src="/to-the-stars.svg"
                width={600}
                height={600}
                alt="Illustration of a rocket"
            />
        </div>
    
    )
}

function Parameters({parameterIsIntersecting}) {
    return (
        <div className={`flex justify-center items-center h-full w-full bg-gray-800 rounded-md transition-opacity ease-in duration-200 col-start-1 col-end-1 row-start-1 row-end-1 ${parameterIsIntersecting ? 'opacity-100' : 'opacity-0'}`}>
            <Image
                src="/computer-program.svg"
                width={600}
                height={600}
                alt="Illustration of configuration options"
            />
        </div>
    
    )
}

function InstallNow() {
    return (
        <div className='flex justify-center items-center mb-48'>
            <div className='flex flex-col justify-center items-center w-fit'>
                <h1 className='text-primary text-6xl mb-8'>Install Now!</h1>
                <div className='w-full pb-2'>
                    <h6 className='text-secondary'>1. Install pdf-lib-table as a Node package:</h6>
                </div>
                <div className="mockup-code w-full mb-4">
                    <pre data-prefix="$"><code>npm i pdf-lib-table</code></pre>
                </div>
                <div className='w-full'>
                    <h6 className='text-secondary'>2. Import pdf-lib-table in your project files:</h6>
                </div>
                <div className="mockup-code w-full mb-4">
                    <pre data-prefix="$"><code>{`import { createPDFTables } from 'pdf-lib-table';`}</code></pre>
                </div>
                <Link href='/documentation'>
                    <button className="btn btn-primary">View Documentation</button>
                </Link>
            </div>
        </div>
    )
}

