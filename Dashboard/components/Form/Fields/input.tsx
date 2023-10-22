'use client'
import classNames from 'classnames'
import { Eye, EyeOff } from 'lucide-react'
import React, {
  DetailedHTMLProps,
  InputHTMLAttributes,
  forwardRef,
  useState,
} from 'react'

type InputProps = {
  label?: string | null
  error?: string | null
  size?: 'input-sm' | 'input-md' | 'input-lg'
  helpText?: string | null
}

const InputField = forwardRef<
  HTMLInputElement,
  InputProps &
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
>(
  (
    {
      label,
      error,
      className,
      name,
      disabled,
      size = 'input-md',
      type,
      helpText,
      ...restProps
    },
    _ref
  ) => {
    const [showPass, setPassVisibility] = useState(false)
    return (
      <div className={classNames('w-full form-control', className)}>
        <label className='label' htmlFor={name}>
          {label && <span className='label-text'>{label}</span>}
          {helpText && <span className='label-text-alt'>{helpText}</span>}
        </label>
        <div
          className={classNames(
            'w-full input input-bordered outline-none overflow-hidden flex items-center',
            size,
            {
              'border-red-500': error,
              'cursor-not-allowed opacity-75': disabled,
            }
          )}>
          <input
            {...restProps}
            name={name}
            disabled={disabled}
            type={type === 'password' ? (showPass ? 'text' : 'password') : type}
            ref={_ref}
            className='w-full h-full autofill:bg-none bg-none'
          />
          {type === 'password' && (
            <PasswordVisibilityToggler
              visible={!showPass}
              handler={() => {
                setPassVisibility(!showPass)
              }}
              className='w-6 h-6 ml-2 text-gray-400 cursor-pointer'
            />
          )}
        </div>
        {error && (
          <label className='label' htmlFor={name}>
            <span className='text-red-500 label-text-alt'>{error}</span>
          </label>
        )}
      </div>
    )
  }
)

InputField.displayName = 'Input Field'

export default InputField

function PasswordVisibilityToggler({
  visible,
  handler,
  className,
}: {
  visible: boolean
  handler: () => void
  className: string
}) {
  if (visible) {
    return <Eye className={className} onClick={handler} />
  }

  return <EyeOff className={className} onClick={handler} />
}
