import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client';
import UserContext from './Context/UserContext';



createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
    return pages[`./Pages/${name}.jsx`]
  },
  setup({ el, App, props }) {
    createRoot(el).render(
      <UserContext>
        <App {...props} />
      </UserContext>
    )
  },
})