import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import BuilderPage from './pages/BuilderPage'

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<BuilderPage />} />
      </Routes>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'rgba(28,28,40,0.95)',
            border: '1px solid rgba(255,255,255,0.14)',
            color: '#f0f0f8',
            fontSize: '13px',
            backdropFilter: 'blur(12px)',
            borderRadius: '10px',
          },
          success: {
            iconTheme: { primary: '#4ade80', secondary: '#0a0a0f' },
          },
          error: {
            iconTheme: { primary: '#f87171', secondary: '#0a0a0f' },
          },
        }}
      />
    </>
  )
}
