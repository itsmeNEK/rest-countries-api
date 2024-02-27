'use client'

import { useRouter } from 'next/navigation'
import PrimaryButton from '../common/button/PrimaryButton'
import ArrowLeftSvgIcon from '../common/svg/ArrowLeftSvgIcon'
import Style from './BackButton.module.scss'

export default function BackButton() {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }
  return (
    <PrimaryButton
      className={Style['back-button']}
      type='button'
      onClick={handleBack}
    >
      <ArrowLeftSvgIcon aria-hidden />
      Back
    </PrimaryButton>
  )
}
