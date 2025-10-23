import { Badge } from "@/components/ui/badge";

type FilterVariant = "nivel" | "lugar" | "zona";

interface FilterChipProps {
  label: string;
  variant: FilterVariant;
}

const variantStyles = {
  nivel: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800",
  lugar: "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800",
  zona: "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800"
};

const FilterChip = ({ label, variant }: FilterChipProps) => {
  return (
    <Badge 
      variant="outline" 
      className={`text-xs font-medium ${variantStyles[variant]}`}
    >
      {label}
    </Badge>
  );
};

export default FilterChip;
