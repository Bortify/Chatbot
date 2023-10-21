import classNames from 'classnames'

type SpinerType = {
  size?: 'small' | 'medium' | 'large'
  color?:
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'neutral'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'none'
    | 'gray'
}

const Spinner: React.FC<SpinerType> = ({ size = 'small', color = 'none' }) => (
  <span
    className={classNames(
      'loading loading-spinner',
      SizeMapping[size],
      ColorMap[color]
    )}
  />
)

export default Spinner

const SizeMapping = {
  small: 'loading-sm',
  medium: 'loading-md',
  large: 'loading-lg',
}

const ColorMap = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  accent: 'text-accent',
  neutral: 'text-neutral',
  info: 'text-info',
  success: 'text-success',
  warning: 'text-warning',
  error: 'text-error',
  gray: 'text-gray-300',
  none: '',
}
