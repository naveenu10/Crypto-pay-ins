import * as React from "react"
import { SVGProps } from "react"
const FailureLogo = (props: SVGProps<SVGSVGElement>) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 84 84"
    >
        <circle cx={42} cy={42} r={42} fill="#FBD0D0" />
        <circle cx={42} cy={42} r={33.6} fill="#EF4444" />
        <path
            fill="#fff"
            fillRule="evenodd"
            d="M32.138 32.138a1.728 1.728 0 0 1 2.444 0L42 39.556l7.418-7.418a1.728 1.728 0 0 1 2.444 2.444L44.444 42l7.418 7.418a1.728 1.728 0 1 1-2.444 2.444L42 44.444l-7.418 7.418a1.728 1.728 0 1 1-2.444-2.444L39.556 42l-7.418-7.418a1.728 1.728 0 0 1 0-2.444Z"
            clipRule="evenodd"
        />
    </svg>
)
export default FailureLogo
