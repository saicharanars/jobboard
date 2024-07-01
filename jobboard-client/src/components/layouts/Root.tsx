import { Children } from "react"
import Footer from "../sharedcomponents/Footer"
import Header from "../sharedcomponents/Header"

const Root = () => {
  return (
    <>
    <Header/>
    {Children}
    <Footer/>
    </>
  )
}

export default Root