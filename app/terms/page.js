import TermDocument from '@/app/components/markdown/terms.mdx'
import {Footer} from '@/app/components'

export default async function Terms() {
    return (
        <div className='h-fit min-h-screen bg-base-100 text-black'>
            <div className='grid grid-cols-1 px-4 lg:px-0 lg:grid-cols-4 auto-cols-max py-12'>
                <div className='min-w-0 lg:col-start-2 lg:col-end-4'>
                    <TermDocument/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
