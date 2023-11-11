import classNames from 'classnames'
import React, { ReactNode } from 'react'

type ToolTipProps = {
  text?: string
  position?: 'LEFT' | 'BOTTOM' | 'RIGHT' | 'TOP'
  children: ReactNode
  className?: string
}

function ToolTip({
  text,
  position = 'BOTTOM',
  children,
  className,
}: ToolTipProps) {
  return (
    <div
      className={classNames(
        'tooltip',
        {
          'tooltip-top': position === 'TOP',
          'tooltip-bottom': position === 'BOTTOM',
          'tooltip-left': position === 'LEFT',
          'tooltip-right': position === 'RIGHT',
        },
        className
      )}
      data-tip={text}>
      {children}
    </div>
  )
}

export default ToolTip
