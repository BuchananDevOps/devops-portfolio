import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { FC } from "react"

import { pulse } from "@/utils/animations"

const Button = dynamic(() => import("@/components/button"))
const Mail = dynamic(() => import("@/components/icons/mail"))

const ContactButton: FC = () => {
  const router = useRouter()
  const handleClick = () => {
    router.push("/contact")
  }
  return (
    <Button
      auto
      as="a"
      css={{
        bg: "rgba(51, 51,51,0.7)",
        "@supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none))":
          {
            bf: "saturate(180%) blur(14px)",
          },
        color: "$text",
        maxH: "38px",
        px: "$8",
        marginLeft: "6px",

        "& .devui-button-icon": {
          mr: "$2",
        },
        "& .devui-button-icon svg": {
          transition: "$default",
        },
        "&:hover": {
          "& .devui-button-icon svg": {
            animation: `${pulse} 1s infinite`,
          },
        },
      }}
      onClick={handleClick}
      icon={<Mail fill="var(--devui-colors-red600)" size={20} />}
    >
      Contact
    </Button>
  )
}

export default ContactButton
