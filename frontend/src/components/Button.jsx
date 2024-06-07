import Link from 'next/link'
import clsx from 'clsx'
import { baseStyles, variantStyles } from '@/assets/data'

export function Button({ variant, color, className, ...props }) {
  variant = variant ?? 'solid'
  color = color ?? 'gray'

  className = clsx(
    baseStyles[variant],
    variantStyles[variant][color],
    className,
  )

  return typeof props.href === 'undefined' ? (
    <button className={className} {...props} />
  ) : (
    <Link className={className} {...props} />
  )
}
