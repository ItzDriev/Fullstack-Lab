interface RedButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export default function RedButton({
  text,
  onClick,
  className = "",
  type = "button",
}: RedButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full py-5 bg-[#ff2d2d] text-white font-bold tracking-[0.3em] uppercase text-xl
                 hover:bg-[#e62626] active:bg-[#cc2020] transition-all duration-200
                 shadow-[0_0_30px_rgba(255,45,45,0.15)] hover:shadow-[0_0_40px_rgba(255,45,45,0.25)]
                 disabled:opacity-50 cursor-pointer ${className}`}
    >
      {text}
    </button>
  );
}
