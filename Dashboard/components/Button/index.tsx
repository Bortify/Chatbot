import classNames from 'classnames'
import Link from 'next/link'
import { DetailedHTMLProps } from 'react'

import Spinner from '../Spinner'

type ButtonProps = {
  color?: 'primary' | 'secondary' | 'neutral' | 'accent' | 'ghost' | 'none'
  state?: 'success' | 'error' | 'warning' | 'info' | 'none'
  size?: 'large' | 'medium' | 'small' | 'extra-small'
  type?: 'outline' | 'solid'
  wide?: boolean
  href?: string
  outerLink?: boolean
  block?: boolean
  loading?: boolean
}

const Button: React.FC<
  ButtonProps &
    DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
> = ({
  children,
  color = 'primary',
  size = 'medium',
  type = 'solid',
  state = 'none',
  wide = false,
  href,
  outerLink,
  block,
  className,
  loading = false,
  ...restProps
}) => {
  const Tag: any = href ? Link : 'button'
  return (
    <Tag
      href={href}
      disabled={loading}
      target={outerLink && '_blank'}
      className={classNames(
        'relative overflow-hidden',
        ColorBtnMap[color],
        StateBtnMap[state],
        BtnSizeMap[size],
        {
          'btn-outline': type === 'outline',
          'btn-wide': wide,
          'btn-block': block,
          btn: !href,
          'opacity-50 cursor-not-allowed': loading,
        },
        className
      )}
      {...restProps}>
      {children}
      <div
        className={classNames(
          'absolute top-0 left-0 grid w-full h-full place-items-center cursor-not-allowed',
          ColorBtnMap[color],
          {
            hidden: !loading,
          }
        )}>
        <Spinner />
      </div>
    </Tag>
  )
}

export default Button

const ColorBtnMap = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  neutral: 'btn-neutral',
  accent: 'btn-accent',
  ghost: 'btn-ghost',
  link: 'btn-link',
  none: '',
}

const StateBtnMap = {
  success: 'btn-success',
  error: 'btn-error',
  warning: 'btn-warning',
  info: 'btn-info',
  none: '',
}

const BtnSizeMap = {
  small: 'btn-sm',
  medium: '',
  large: 'btn-lg',
  'extra-small': 'btn-xs',
}
