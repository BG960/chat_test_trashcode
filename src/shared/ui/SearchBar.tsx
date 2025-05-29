export const SearchBar = ({ placeholder }: { placeholder: string }) => (
  <div className="relative">
    <input
      type="text"
      placeholder={placeholder}
      className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 focus:outline-none"
    />
    <span className="absolute left-3 top-2.5">🔍</span>
  </div>
);