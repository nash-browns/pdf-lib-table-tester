'use client';

import { CopyConfigButton } from "./";

export function CopyCode({ userPdfSettings, columns }) {

    return (
        <div className='flex w-full mb-2 justify-end items-center'>
            <CopyConfigButton
                userPdfSettings={userPdfSettings}
                columns={columns}
            />
        </div>
    )
}
