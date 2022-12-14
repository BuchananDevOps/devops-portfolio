import dynamic from "next/dynamic"
import Script from "next/script"
import { FC, PropsWithChildren } from "react"

const PageHeader = dynamic(() => import("./PageHeader"))
const PageFooter = dynamic(() => import("./PageFooter"))
const Container = dynamic(() => import("@/components/container"))
interface Props {
  children: React.ReactNode
  className?: string
}

const Page: FC<Props> = ({ children, className }: PropsWithChildren<Props>) => {
  return (
    <div className={className}>
      <PageHeader />
      {children}
      <PageFooter />
    </div>
  )
}

export default Page
