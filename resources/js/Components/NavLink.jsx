import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center px-1 pt-1 border-b-2 text-lg font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-yellow-600 text-yellow-700 focus:border-indigo-700 '
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 focus:text-slate-700 focus:border-slate-300 ') +
                className
            }
        >
            {children}
        </Link>
    );
}
