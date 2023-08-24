import OverviewPage from '@/components/OverviewPage'
import React from 'react'

export default function page({ params }) {
    const id = params.animeId;
    return (
        <div>
            <OverviewPage id={id} />
        </div>
    )
}
