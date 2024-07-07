import Navbar from "@/components/client/Navbar"


const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="py-4">
        <Navbar />
      </div>
      {children}
    </>
  )
}

export default PageLayout