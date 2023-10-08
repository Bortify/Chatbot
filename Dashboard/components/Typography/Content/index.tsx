import { DetailedHTMLProps, HTMLAttributes } from 'react'
import classNames from 'classnames'

import { FontPropTypes } from '../Types'
import Fonts from '../Font'
import { BoldnessToFontWeightMap } from '../constants'

interface ContentPropType
  extends FontPropTypes,
    DetailedHTMLProps<
      HTMLAttributes<HTMLParagraphElement>,
      HTMLParagraphElement
    > {}

const Content: React.FC<ContentPropType> = ({
  children,
  boldness = 500,
  italic = false,
  underline = false,
  fontFamily = 'manrope',
  className,
  size = 'lg',
  ...restProps
}) => {
  return (
    <p
      {...restProps}
      className={classNames(
        {
          underline: underline,
          italic: italic,
        },
        Fonts[fontFamily],
        BoldnessToFontWeightMap[boldness],
        `text-${size}`,
        className
      )}>
      {children}
    </p>
  )
}

export default Content