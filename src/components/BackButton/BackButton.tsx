'use client'

import PrimaryButton from '../common/button/PrimaryButton'
import ArrowLeftSvgIcon from '../common/svg/ArrowLeftSvgIcon'
import Style from './BackButton.module.scss'

export default function BackButton() {
  return (
    <PrimaryButton
      className={Style['back-button']}
      type='submit'
      aria-label='Go to previous page'
      onClick={() => window.history.back()}
    >
      <ArrowLeftSvgIcon aria-hidden />
      Back
    </PrimaryButton>
  )
}
