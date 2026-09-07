
import { createRoot } from 'react-dom/client'
import './index.css'
import AuthRoutesApp from './routes/auth.routes'

createRoot(document.getElementById('root')!).render(
    <AuthRoutesApp />
)
