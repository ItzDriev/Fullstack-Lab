function StatBlock({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center">
      <span className="font-bold text-red-400 text-4xl">{number}</span>
      <p className="mt-2 text-[#4a6274] text-sm uppercase tracking-wider">
        {label}
      </p>
    </div>
  );
}

export default StatBlock;
