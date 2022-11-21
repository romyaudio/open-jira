import {FC} from 'react'
import {Box} from '@mui/material'
import React, { PropsWithChildren } from 'react';

import Head from 'next/head'
import { Navbar, Sidebar } from '../ui';

interface Props {
        title?:'string'
    }

export const Layout:FC<PropsWithChildren<Props>>= ({title='Open-Jira',children}) => {
    
  return (
    <Box sx={{flexFlow:1}}>
     <Head>
        <title>{title}</title>
     </Head>
     <Navbar/>
     <Sidebar/>

     <Box sx={{padding:'10px 20px'}}>
        {children}
    </Box>
     
    </Box>
  )
}
