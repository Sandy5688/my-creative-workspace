import * as React from "react"
import { cn } from "@/lib/utils"

const Panel = React.forwardRef(function Panel(props: any, ref: any) {
  const { className, ...rest } = props
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        className
      )}
      {...rest}
    />
  )
})
Panel.displayName = "Panel"

const PanelHeader = React.forwardRef(function PanelHeader(props: any, ref: any) {
  const { className, ...rest } = props
  return (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...rest}
    />
  )
})
PanelHeader.displayName = "PanelHeader"

const PanelTitle = React.forwardRef(function PanelTitle(props: any, ref: any) {
  const { className, ...rest } = props
  return (
    <h3
      ref={ref}
      className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
      {...rest}
    />
  )
})
PanelTitle.displayName = "PanelTitle"

const PanelDescription = React.forwardRef(function PanelDescription(props: any, ref: any) {
  const { className, ...rest } = props
  return (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...rest}
    />
  )
})
PanelDescription.displayName = "PanelDescription"

const PanelContent = React.forwardRef(function PanelContent(props: any, ref: any) {
  const { className, ...rest } = props
  return <div ref={ref} className={cn("p-6 pt-0", className)} {...rest} />
})
PanelContent.displayName = "PanelContent"

const PanelFooter = React.forwardRef(function PanelFooter(props: any, ref: any) {
  const { className, ...rest } = props
  return (
    <div
      ref={ref}
      className={cn("flex items-center p-6 pt-0", className)}
      {...rest}
    />
  )
})
PanelFooter.displayName = "PanelFooter"

export { Panel, PanelHeader, PanelFooter, PanelTitle, PanelDescription, PanelContent }
