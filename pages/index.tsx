import { NextPage } from "next"
import dynamic from "next/dynamic"

import Hero from "@/components/hero"

const ServiceCards = dynamic(
  () => import("@/interface/Sections/Landing/ServiceCards")
)

const Page: NextPage = () => {
  return (
    <>
      <Hero
        buttonGroup={[
          {
            text: "Learn More",
            link: "/web-design",
            style: "default",
          },
          {
            text: "Contact Us",
            link: "/contact",
            style: "gradient",
          },
        ]}
        description="We build full stack applications with incredible performance and love for the craft. If you've made it this far, you're ready to unlock your full potential."
        gradientBorder={true}
        subtitle="Development."
        title="Digital Business"
        type="landing"
      />
      <ServiceCards />
    </>
  )
}

export default Page
