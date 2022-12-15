import { styled, VariantProps } from "@/theme/stitches.config"

export const StyledNav = styled("nav", {
  verticalAlign: "middle",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
  px: "$lg",
  py: "$sm",
})

export const StyledNavList = styled("ul", {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  listStyle: "none",
  margin: 0,
  padding: 0,
})

export type NavVariantsProps = VariantProps<typeof StyledNav>

export default StyledNav