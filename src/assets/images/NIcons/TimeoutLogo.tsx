import * as React from "react"
import { SVGProps } from "react"
const TimeoutLogo = (props: SVGProps<SVGSVGElement>) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 84 84"
    >
        <circle cx={42} cy={42} r={42} fill="#FEEA9A" />
        <circle cx={42} cy={42} r={33.6} fill="#FCCB03" />
        <path
            fill="#fff"
            fillRule="evenodd"
            d="M55.824 42c0 7.635-6.19 13.824-13.824 13.824-7.635 0-13.824-6.19-13.824-13.824 0-7.635 6.19-13.824 13.824-13.824 7.635 0 13.824 6.19 13.824 13.824Zm-12.096 6.912a1.728 1.728 0 1 1-3.456 0 1.728 1.728 0 0 1 3.456 0ZM42 33.36c-.954 0-1.728.774-1.728 1.728V42a1.728 1.728 0 1 0 3.456 0v-6.912c0-.954-.774-1.728-1.728-1.728Z"
            clipRule="evenodd"
        />
    </svg>
)
export default TimeoutLogo
