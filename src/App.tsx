import React, { FC, Suspense } from 'react'

import classes from './App1.module.scss'
import 'mfHost1/styles'

import { sum } from 'mfHost1/utils'
// const sum = React.lazy(() => import('mfHost1/utils'))

const App: FC = () => {
  console.log('sum ', sum())

  return (
    <Suspense fallback="loading...">
      <div className={classes.app1}>App1</div>
    </Suspense>
  )
}

export default App
