export default function PrimaryButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center px-4 py-2 bg-second border border-transparent rounded-md font-semibold text-xs text-main uppercase tracking-widest hover:bg-second-effect focus:bg-second-effect active:bg-second-effect focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 transition ease-in-out duration-150 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
