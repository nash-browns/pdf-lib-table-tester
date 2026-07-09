import Image from 'next/image'
import Link from 'next/link';

import { BuyMeACoffee } from './';

export function Footer() {
    return (
        <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
            <BuyMeACoffee />
            <nav className="grid grid-flow-col gap-4">
                <Link href='/examples' className="link link-hover">Examples</Link>
                <Link href='/documentation' className="link link-hover">Documentation</Link>
                <Link href='/terms' className="link link-hover">Terms of Use</Link>
            </nav> 
            <nav>
                <div className="flex justify-center items-center gap-5">
                    <a href="https://www.nashbrowns.com/"><Image src="/nash-browns.png" width={100} height={100} alt="Nash Browns logo" /></a>
                    <a href="https://github.com/nash-browns/pdf-lib-table"><Image src="/github-logo.svg" width={80} height={80} alt="Nash Browns logo" /></a>
                </div>
            </nav> 
            <aside>
                <p>Copyright © 2026 - All rights reserved by Nash Browns</p>
            </aside>
        </footer>
    )
}
