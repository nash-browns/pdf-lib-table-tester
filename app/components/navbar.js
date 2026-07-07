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
        <div className='flex justify-center items-center'>
            <div className='min-w-52 pl-4'>
                <LogoSection/>
            </div>
            <div className="navbar justify-center">
                <div className="navbar-center">
                    {
                        pages.map(({name, link}) => (
                            <Link key={name} href={link}>
                                <button key={name} className={`btn btn-ghost text-xl text-primary ${link === pathname? 'btn-active' : ''}`}>{name}</button>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    )
    
}

function LogoSection() {
    return(
        <div className='flex justify-start items-center gap-3'>
            <h1 className="text-xl text-primary">PDF-LIB-TABLE</h1>
            <div className='h-7 w-7 text-primary'>
                <TableCellsIcon/>
            </div>
        </div>
    )
}
