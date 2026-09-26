const legacyMap = {
  'bg-blue-600': 'bg-[var(--ink)] text-[var(--bg)] hover:bg-[var(--ember)] hover:text-white',
  'bg-green-500': 'bg-[var(--moss)] text-white hover:brightness-110',
  'bg-red-500': 'bg-[#C2431F] text-white hover:brightness-110 dark:bg-[#E4572E]',
}

export default function Button({
    children,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "",
    ...props
}) {
    // Keep prop API identical for compatibility; map old palette to the new system.
    const mapped = legacyMap[bgColor];
    const colorClasses = mapped
      ? mapped
      : `${bgColor} ${textColor}`;

    return (
        <button
            type={type}
            className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-[var(--ink)] px-5 py-2.5 text-sm font-bold tracking-tight transition-all duration-200 hard-sm lift ${colorClasses} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
