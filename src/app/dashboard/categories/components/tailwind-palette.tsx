import React from "react";
import { TailwindPaletteProps } from "./types";

const colors = [
    "bg-gray-200", "bg-stone-200", "bg-red-200", "bg-orange-200", "bg-amber-200", "bg-yellow-200", "bg-lime-200", "bg-green-200", "bg-emerald-200", "bg-teal-200", "bg-cyan-200", "bg-sky-200", "bg-blue-200", "bg-indigo-200", "bg-violet-200", "bg-purple-200", "bg-fuchsia-200", "bg-pink-200", "bg-rose-200",
    "bg-gray-300", "bg-stone-300", "bg-red-300", "bg-orange-300", "bg-amber-300", "bg-yellow-300", "bg-lime-300", "bg-green-300", "bg-emerald-300", "bg-teal-300", "bg-cyan-300", "bg-sky-300", "bg-blue-300", "bg-indigo-300", "bg-violet-300", "bg-purple-300", "bg-fuchsia-300", "bg-pink-300", "bg-rose-300",
    "bg-gray-400", "bg-stone-400", "bg-red-400", "bg-orange-400", "bg-amber-400", "bg-yellow-400", "bg-lime-400", "bg-green-400", "bg-emerald-400", "bg-teal-400", "bg-cyan-400", "bg-sky-400", "bg-blue-400", "bg-indigo-400", "bg-violet-400", "bg-purple-400", "bg-fuchsia-400", "bg-pink-400", "bg-rose-400",
    "bg-gray-500", "bg-stone-500", "bg-red-500", "bg-orange-500", "bg-amber-500", "bg-yellow-500", "bg-lime-500", "bg-green-500", "bg-emerald-500", "bg-teal-500", "bg-cyan-500", "bg-sky-500", "bg-blue-500", "bg-indigo-500", "bg-violet-500", "bg-purple-500", "bg-fuchsia-500", "bg-pink-500", "bg-rose-500",
    "bg-gray-600", "bg-stone-600", "bg-red-600", "bg-orange-600", "bg-amber-600", "bg-yellow-600", "bg-lime-600", "bg-green-600", "bg-emerald-600", "bg-teal-600", "bg-cyan-600", "bg-sky-600", "bg-blue-600", "bg-indigo-600", "bg-violet-600", "bg-purple-600", "bg-fuchsia-600", "bg-pink-600", "bg-rose-600",
    "bg-gray-700", "bg-stone-700", "bg-red-700", "bg-orange-700", "bg-amber-700", "bg-yellow-700", "bg-lime-700", "bg-green-700", "bg-emerald-700", "bg-teal-700", "bg-cyan-700", "bg-sky-700", "bg-blue-700", "bg-indigo-700", "bg-violet-700", "bg-purple-700", "bg-fuchsia-700", "bg-pink-700", "bg-rose-700",
    "bg-gray-800", "bg-stone-800", "bg-red-800", "bg-orange-800", "bg-amber-800", "bg-yellow-800", "bg-lime-800", "bg-green-800", "bg-emerald-800", "bg-teal-800", "bg-cyan-800", "bg-sky-800", "bg-blue-800", "bg-indigo-800", "bg-violet-800", "bg-purple-800", "bg-fuchsia-800", "bg-pink-800", "bg-rose-800",
];

const TailwindPalette = (props: TailwindPaletteProps) => {
    const { value, onChange, disabled } = { ...props }
    const [selected, setSelected] = React.useState<string>(value);

    const handleSelect = (tailwindColor: string) => {
        setSelected(tailwindColor);
        onChange(tailwindColor);
    }

    React.useEffect(() => {
        setSelected(value);
    }, [value]);

    return (
        <ul className="grid w-fit [grid-template-columns:repeat(7,1.25rem)] xs:[grid-template-columns:repeat(19,1.25rem)] bg-gray-50 rounded-lg border-[#cbd5e1] border-1 p-2 shadow-sm">
            {
                colors.map((color) => (
                    <button
                        key={color}
                        type="button"
                        disabled={disabled}
                        className={`size-5 ${color} ${selected === color ? "border-3 border-black" : "border-1 border-gray-300 focus-visible:border-2 focus-visible:border-gray-600"} outline-none disabled:cursor-default hover:cursor-pointer`}
                        onClick={() => handleSelect(color)}
                        title={color}
                    />
                ))
            }
        </ul>
    );
}

export default TailwindPalette;