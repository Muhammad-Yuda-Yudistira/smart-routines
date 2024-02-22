export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-orange-300 text-second shadow-sm focus:ring-orange-600 ' +
                className
            }
        />
    );
}
