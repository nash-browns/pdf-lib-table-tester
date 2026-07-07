import Documentation from '../components/markdown/documentation.mdx';

export default function Doc() {
    return (
        <div className='absolute grid grid-cols-4 gap-6 px-4 py-8 bg-base-100 text-black h-[calc(100vh-64px)]'>
            <div className='col-span-1'>
                <DocNav/>
            </div>
            <div className='col-span-3'>
                <Documentation/>
            </div>
        </div>
    )
}

function DocNav() {
    const sections = [
        { name: 'Installation', anchor: '#installation' },
        { name: 'Basic usage', anchor: '#basic-usage' },
        { name: 'Coordinates and sizing', anchor: '#coordinates-and-sizing' },
        { name: 'Multi-page tables', anchor: '#multi-page-tables' },
        { name: 'Options', anchor: '#options', children: [
            { name: 'Table', anchor: '#table' },
            { name: 'Continuation footer', anchor: '#continuation-footer' },
            { name: 'Header', anchor: '#header' },
            { name: 'Rows', anchor: '#rows' },
            { name: 'Cells', anchor: '#cells' },
            { name: 'Subheadings', anchor: '#subheadings' },
        ]},
        { name: 'Not yet implemented', anchor: '#not-yet-implemented' },
    ];

    return (
        <ul className="sticky top-[32px] left-0 menu bg-base-200 w-56 rounded-box h-[calc(100vh-64px-64px)] overflow-y-auto flex-nowrap">
            {sections.map(({ name, anchor, children }) => (
                <li key={anchor}>
                    {children ? (
                        <details open>
                            <summary><a href={anchor}>{name}</a></summary>
                            <ul>
                                {children.map((child) => (
                                    <li key={child.anchor}><a href={child.anchor}>{child.name}</a></li>
                                ))}
                            </ul>
                        </details>
                    ) : (
                        <a href={anchor}>{name}</a>
                    )}
                </li>
            ))}
        </ul>
    )
}
