import React, { DetailedHTMLProps, HTMLAttributes } from 'react'
import classNames from 'classnames'

import Fonts from '../Font'
import { FontPropTypes } from '../Types'
import { BoldnessToFontWeightMap } from '../constants'

interface HeadingPropsType
  extends DetailedHTMLProps<
      HTMLAttributes<HTMLHeadingElement>,
      HTMLHeadingElement
    >,
    FontPropTypes {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  size: 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | 'sm'
}

const Heading: React.FC<HeadingPropsType> = ({
  className,
  children,
  variant,
  boldness = 500,
  italic = false,
  underline = false,
  fontFamily = 'manrope',
  size = 'base',
  ...restProps
}) => {
  const props = {
    ...restProps,
    className: classNames(
      Fonts[fontFamily],
      BoldnessToFontWeightMap[boldness],
      {
        underline: underline,
        italic: italic,
      },
      SizeMaping[size],
      className
    ),
  }
  switch (variant) {
    case 'h1':
      return <h1 {...props}>{children}</h1>
    case 'h2':
      return <h2 {...props}>{children}</h2>
    case 'h3':
      return <h3 {...props}>{children}</h3>
    case 'h4':
      return <h4 {...props}>{children}</h4>
    case 'h5':
      return <h5 {...props}>{children}</h5>
    case 'h6':
      return <h6 {...props}>{children}</h6>
  }
}

export default Heading

const SizeMaping = {
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
  '5xl': 'text-5xl',
  '6xl': 'text-6xl',
}
