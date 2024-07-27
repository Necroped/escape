/// <reference path="../adonisrc.ts" />
/// <reference path="../config/inertia.ts" />
/// <reference path="../config/auth.ts" />

import './css/app.css'
import { createRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import { name } from '../package.json'

const appName = import.meta.env.VITE_APP_NAME || name

createInertiaApp({
  progress: { color: '#5468FF' },

  title: (title) => `${title} - ${appName}`,

  resolve: (pageName) => {
    return resolvePageComponent(`./pages/${pageName}.tsx`, import.meta.glob('./pages/**/*.tsx'))
  },

  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },
})
