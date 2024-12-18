
import { Outlet } from 'react-router-dom'
import './App.css'
import AdminNavbar from'./components/AdminNavbar'

function AdminApp() {
  

  return (
    <>
    <div className="flex min-w-[1000px]">
      <AdminNavbar />
      <main className="flex-grow p-4">
        <Outlet />                
      </main>
    </div>
    </>
  )
}

export default AdminApp
