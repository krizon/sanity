import {UnknownIcon} from '@sanity/icons'
import {useStateLink} from '@sanity/state-router'
import {Button} from '@sanity/ui'
import React, {useMemo} from 'react'
import {SanityTool} from '../../../config'

export function ToolButton(props: {selected: boolean; tool: SanityTool}) {
  const {selected, tool} = props
  const state = useMemo(() => ({tool: tool.name}), [tool])
  const link = useStateLink({state})

  return (
    <Button
      as="a"
      href={link.href}
      icon={tool.icon || UnknownIcon}
      mode="bleed"
      onClick={link.handleClick}
      selected={selected}
      text={tool.title}
    />
  )
}