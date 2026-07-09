'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { TableCellsIcon } from '@heroicons/react/20/solid';

const pages = [
    {name: 'Home', link: '/'},
    {name: 'Examples', link: '/examples'},
    {name: 'Documentation', link: '/documentation'},
];
 
export function NavBar() {
    const pathname = usePathname()
    
    return (
        <div className='navbar relative flex justify-start items-center'>
            <div className='pl-2 sm:pl-4 md:min-w-52'>
                <LogoSection/>
            </div>
            {/* absolutely centered on the page so the logo's width can't push the links off-center */}
            <div className='absolute left-1/2 -translate-x-1/2'>
                {
                    pages.map(({name, link}) => (
                        <Link key={name} href={link}>
                            <button key={name} className={`btn btn-ghost btn-sm md:btn-md px-2 md:px-4 text-base md:text-xl text-primary ${link === pathname? 'btn-active' : ''}`}>{name}</button>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
    
}

function LogoSection() {
    return(
        <Link href='/'>
            <div className='flex justify-start items-center gap-3'>
                <h1 className="hidden md:block text-xl text-primary">PDF-LIB-TABLE</h1>
                <div className='h-7 w-7 text-primary'>
                    <TableCellsIcon/>
                </div>
            </div>
        </Link>
    )
}
