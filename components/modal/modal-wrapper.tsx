import React, { useEffect, useMemo, useRef, useState } from "react"

import { CSS } from "@/theme/stitches.config"
import cslx from "@/utils/clsx"
import { isChildElement } from "@/utils/collections"
import CSSTransition from "@/utils/css-transition"
import withDefaults from "@/utils/with-defaults"

import ModalCloseButton from "./modal-close-button"
import {
  ModalVariantsProps,
  StyledModal,
  StyledModalHideTab,
} from "./modal.styles"

interface Props {
  visible?: boolean
  scroll?: boolean
  rebound?: boolean
  animated?: boolean
  fullScreen?: boolean
  closeButton?: boolean
  as?: keyof JSX.IntrinsicElements
  className?: string
  onCloseButtonClick?: () => void
}

const defaultProps = {
  className: "",
  visible: false,
  rebound: false,
}

type NativeAttrs = Omit<React.DialogHTMLAttributes<unknown>, keyof Props>

export type ModalWrapperProps = Props &
  NativeAttrs &
  ModalVariantsProps & { css?: CSS }

const preClass = "deui-modal"

const ModalWrapper: React.FC<React.PropsWithChildren<ModalWrapperProps>> = ({
  className,
  children,
  visible,
  fullScreen,
  closeButton,
  rebound,
  animated,
  onCloseButtonClick,
  scroll,
  ...props
}) => {
  const modalContent = useRef<HTMLDivElement>(null)
  const tabStart = useRef<HTMLDivElement>(null)
  const tabEnd = useRef<HTMLDivElement>(null)
  const [rendered, setRendered] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setRendered(true)
      clearTimeout(timer)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!visible) return
    const activeElement = document.activeElement
    const isChild = isChildElement(modalContent.current, activeElement)
    if (isChild) return
    tabStart.current && tabStart.current.focus()
  }, [visible])

  const handleClose = () => {
    onCloseButtonClick && onCloseButtonClick()
  }

  const getState = useMemo(() => {
    return visible ? "open" : "closed"
  }, [visible])

  const renderChildren = useMemo(() => {
    return (
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
      <StyledModal
        ref={modalContent}
        aria-modal={visible}
        className={cslx(
          preClass,
          `${preClass}--${getState}`,
          {
            [`${preClass}-fullscreen`]: fullScreen,
            [`${preClass}-with-close-button`]: closeButton,
            [`${preClass}-rebound`]: rebound,
            [`${preClass}-rendered`]: rendered,
          },
          className
        )}
        closeButton={closeButton}
        data-state={getState}
        fullScreen={fullScreen}
        role="dialog"
        scroll={scroll}
        tabIndex={-1}
        {...props}
        onKeyDown={handleClose}
      >
        <StyledModalHideTab
          ref={tabStart}
          aria-hidden="true"
          className={`${preClass}-hide-tab`}
          role="button"
          tabIndex={0}
        />
        {closeButton && <ModalCloseButton onClick={handleClose} />}
        {children}
        <StyledModalHideTab
          ref={tabEnd}
          aria-hidden="true"
          className={`${preClass}-hide-tab`}
          role="button"
          tabIndex={0}
        />
      </StyledModal>
    )
  }, [rebound, children])

  return (
    <>
      {animated ? (
        <CSSTransition
          clearTime={300}
          enterTime={20}
          leaveTime={20}
          name={`${preClass}-wrapper`}
          visible={visible}
        >
          {renderChildren}
        </CSSTransition>
      ) : visible ? (
        renderChildren
      ) : null}
    </>
  )
}

ModalWrapper.toString = () => ".devui-modal-wrapper"

export default withDefaults(ModalWrapper, defaultProps)
