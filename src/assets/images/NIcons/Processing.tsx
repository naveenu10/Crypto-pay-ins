import * as React from "react"
import { SVGProps } from "react"
const Processing = (props: SVGProps<SVGSVGElement>) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 114 114"
    >
        <g clipPath="url(#a)">
            <g clipPath="url(#b)">
                <path
                    fill="#279FFE"
                    fillOpacity={0.5}
                    d="M57 114c31.48 0 57-25.52 57-57S88.48 0 57 0 0 25.52 0 57s25.52 57 57 57Z"
                />
                <path
                    fill="#279FFE"
                    d="M57 102.6c25.185 0 45.6-20.415 45.6-45.6 0-25.184-20.415-45.6-45.6-45.6-25.184 0-45.6 20.416-45.6 45.6 0 25.185 20.416 45.6 45.6 45.6Z"
                />
                <path
                    fill="#fff"
                    fillRule="evenodd"
                    d="M57 75.761c10.362 0 18.761-8.4 18.761-18.76 0-10.362-8.4-18.762-18.76-18.762-10.362 0-18.762 8.4-18.762 18.761 0 10.362 8.4 18.761 18.761 18.761Zm.652-28.141a.651.651 0 0 0-1.303 0V57c0 .173.069.339.19.461l6.634 6.633a.652.652 0 0 0 .921-.921l-6.442-6.442V47.62Z"
                    clipRule="evenodd"
                />
                <path
                    fill="#fff"
                    fillOpacity={0.1}
                    d="M-6597.07-1828.07H3694.14v-2.72H-6597.07v2.72Zm10292.57 1.36v5998.57h2.72v-5998.57h-2.72Zm-1.36 5999.92H-6597.07v2.72H3694.14v-2.72Zm-10292.57-1.35v-5998.57h-2.71v5998.57h2.71Zm1.36 1.35c-.75 0-1.36-.61-1.36-1.35h-2.71c0 2.25 1.82 4.07 4.07 4.07v-2.72Zm10292.57-1.35c0 .74-.61 1.35-1.36 1.35v2.72a4.07 4.07 0 0 0 4.08-4.07h-2.72Zm-1.36-5999.93c.75 0 1.36.61 1.36 1.36h2.72c0-2.26-1.82-4.08-4.08-4.08v2.72Zm-10291.21-2.72a4.07 4.07 0 0 0-4.07 4.08h2.71c0-.75.61-1.36 1.36-1.36v-2.72Z"
                />
            </g>
        </g>
        <defs>
            <clipPath id="a">
                <path fill="#fff" d="M0 0h114v114H0z" />
            </clipPath>
            <clipPath id="b">
                <path fill="#fff" d="M0 0h114v114H0z" />
            </clipPath>
        </defs>
    </svg>
)
export default Processing
