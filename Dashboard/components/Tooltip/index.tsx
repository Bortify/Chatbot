import classNames from 'classnames'
import React, { ReactNode } from 'react'

type ToolTipProps = {
  text?: string
  position?: 'LEFT' | 'BOTTOM' | 'RIGHT' | 'TOP'
  children: ReactNode
}

function ToolTip({ text, position = 'BOTTOM', children }: ToolTipProps) {
  return (
    <div
      className={classNames('tooltip', {
        'tooltip-top': position === 'TOP',
        'tooltip-bottom': position === 'BOTTOM',
        'tooltip-left': position === 'LEFT',
        'tooltip-right': position === 'RIGHT',
      })}
      data-tip={text}>
      {children}
    </div>
  )
}

export default ToolTip
