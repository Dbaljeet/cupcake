import Head from "next/head"
import { FC } from "react"
import { Navbar,SideMenu } from "../ui"
import { useState } from 'react'
interface Props {
  children: React.ReactNode | React.ReactNode[];
  title: string
  pageDescription: string
  imageFullUrl?: string
}
export const ShopLayout: FC<Props> = ({
  children,
  title,
  pageDescription,
  imageFullUrl,
}) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={pageDescription} />
        <meta name='og:title' content={title} />
        <meta name='og:description' content={pageDescription} />
        {imageFullUrl && <meta name='og:image' content={imageFullUrl} />}
      </Head>
      <nav>
        <Navbar setShowMenu = {setShowMenu}></Navbar>
      </nav>
      <SideMenu showMenu = {showMenu}/>
      <main
        style={{
          margin: "80px auto",
          maxWidth: "1440px",
          padding: "0x 30px",
        }}
      >
        {children}
      </main>
      <footer></footer>
    </>
  )
}
