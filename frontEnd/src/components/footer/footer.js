import React from 'react'
import "./footer.css"
export default function Footer() {
  return (
    <footer className='mt-4 border boreder-none border-top-3 d-flex align-items-center'>

      <div className='container'>
        <div className='d-flex justify-content-around fs-3 '>
          <div className='text-center'>
            <a href='https://github.com/itamarHarbi' target='_blank'>
              <i className="bi bi-github"></i>
            </a>

          </div>
          <div dir='ltr'>
            © Healthy life team 2024
          </div>

        </div>
      </div>
    </footer>
  )
}
