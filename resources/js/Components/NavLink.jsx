import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center px-1 pt-1 border-b-2 text-lg font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-slate-500 text-slate-500 focus:border-slate-700 '
                    : 'border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-300 focus:text-slate-400 focus:border-slate-400 ') +
                className
            }
        >
            {children}
        </Link>
    );
}
