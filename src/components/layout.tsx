import type { PropsWithChildren } from 'react'
import Header from './header'

function Layout({children}: PropsWithChildren){
  return <div className="bg-gradient-to-br from-background to-muted">
   <Header />
   <main className='min-h-screen container mx-auto px-4 py-8'>
      {children}
   </main>
   <footer className='border-t backdrop-blur py-12 supports-[backdrop-filter]:bg-background/60'>
      <div className='container mx-auto px-4 text-center text-grey-400'>
         <p>© 2024 Maksym Sovyk. All rights reserved</p>
      </div>
   </footer>
   </div>
}

export default Layout