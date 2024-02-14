import {
  ReactNode,
  ButtonHTMLAttributes,
  forwardRef,
  ForwardedRef,
} from 'react'
import Style from './PrimaryButton.module.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  className?: string
}

const PrimaryButton = forwardRef(
  (
    { children, className, ...props }: ButtonProps,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <button
        ref={ref}
        className={`${className} ${Style['primary-button']}`}
        {...props}
      >
        {children}
      </button>
    )
  }
)

PrimaryButton.displayName = 'PrimaryButton'

export default PrimaryButton
