import FooterComponent from "@/components/client/FooterComponent"
import Navbar from "@/components/client/Navbar"


const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="py-4">
        <Navbar />
      </div>
      {children}
      <FooterComponent />
    </>
  )
}

export default PageLayout