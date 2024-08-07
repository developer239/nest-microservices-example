import clsx from 'clsx'

export type IProps = {
  uri?: string
  className?: string
  children: React.ReactNode
}

export const Card = ({ children, className, uri, ...divProps }: IProps) => (
  <div
    className={clsx('w-full bg-white rounded-xs shadow-light', className)}
    {...divProps}
  >
    {children}
  </div>
)
