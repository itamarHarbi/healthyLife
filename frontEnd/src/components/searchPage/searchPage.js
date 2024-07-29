import React, { useEffect } from 'react'
import BannersRender from './bannersRender'

export default function SearchPage() {
  const searchParams = new URLSearchParams(window.location.search);
  const q = searchParams.get('q') || ""
  useEffect(()=>{},[q])
  return (
    <main className='container'>
      <BannersRender q={q} />
    </main>
  )
}
