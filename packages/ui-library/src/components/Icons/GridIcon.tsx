import { JSX } from 'react'

export type IProps = JSX.IntrinsicElements['svg']

export default (svgProps: IProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    height="100%"
    width="100%"
    {...svgProps}
  >
    <path d="M4 11h5V5H4v6zm0 7h5v-6H4v6zm6 0h5v-6h-5v6zm6 0h5v-6h-5v6zm-6-7h5V5h-5v6zm6-6v6h5V5h-5z" />
  </svg>
)
